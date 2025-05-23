import { FastifyInstance } from 'fastify'
import { db } from '../database'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function meRoute(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJWT] }, async (request, reply) => {
    const userId = request.user.sub

    const user = await db('users').select('*').where('id', userId).first()

    if (!user) {
      throw new Error('Error to find user')
    }

    return reply.status(200).send({
      ...user,
      password_hash: undefined,
    })
  })
}
