import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { db } from '../database'
import { randomUUID } from 'node:crypto'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const registerUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerUserBodySchema.parse(request.body)

    const passwordHash = await hash(password, 6)

    const user = await db('users').insert({
      id: randomUUID(),
      name,
      email,
      password_hash: passwordHash,
    })

    return reply.status(201).send({ user })
  })

  app.get('/:id', async (request) => {
    const findUserByIdParamsScheme = z.object({
      id: z.string().uuid(),
    })

    const { id } = findUserByIdParamsScheme.parse(request.params)

    const user = await db('users').select('*').where('id', id).first()

    return {
      user,
    }
  })

  app.get('/all', async () => {
    const users = await db('users').select('*')

    return {
      users,
    }
  })
}
