import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { db } from '../database'
import { randomUUID } from 'node:crypto'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/register', { onRequest: [verifyJWT] }, async (request, reply) => {
    const registerMealBodySchema = z.object({
      name: z.string().nonempty(),
      description: z.string(),
      dateTime: z.string().datetime(),
      dietPart: z.boolean(),
    })

    const { name, description, dateTime, dietPart } =
      registerMealBodySchema.parse(request.body)
    const userId = request.user.sub

    const meal = await db('meals').insert({
      id: randomUUID(),
      name,
      description,
      date_time: dateTime,
      diet_part: dietPart,
      user_id: String(userId),
    })

    return reply.status(201).send({
      meal,
    })
  })

  app.get('/', { onRequest: [verifyJWT] }, async (request, reply) => {
    const userId = request.user.sub

    const meals = await db('meals').select('*').where('user_id', userId)

    return reply.status(200).send({
      meals,
    })
  })
}
