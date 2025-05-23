import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../database'
import { compare } from 'bcryptjs'

export async function sessionRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const user = await db('users').where('email', email).first()

    if (!user) {
      throw new Error('User not found.')
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new Error('Invalid credentials.')
    }

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  })
}
