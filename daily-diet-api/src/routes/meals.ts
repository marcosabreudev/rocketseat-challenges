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

    await db('meals').insert({
      id: randomUUID(),
      name,
      description,
      date_time: dateTime,
      diet_part: dietPart,
      user_id: String(userId),
    })

    return reply.status(201).send({
      meal: { name, description, dateTime, dietPart },
    })
  })

  app.get('/', { onRequest: [verifyJWT] }, async (request, reply) => {
    const userId = request.user.sub

    const meals = await db('meals').select('*').where('user_id', userId)

    return reply.status(200).send({
      meals,
    })
  })

  app.delete('/:id', { onRequest: [verifyJWT] }, async (request, reply) => {
    const deleteMealByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteMealByIdParamsSchema.parse(request.params)

    const meal = await db('meals').select('*').where('id', id).first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    await db('meals').where('id', id).del()

    return reply.status(200).send()
  })

  app.get('/:id', { onRequest: [verifyJWT] }, async (request, reply) => {
    const getMealByidSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealByidSchema.parse(request.params)

    const meal = await db('meals').select('*').where('id', id).first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    return reply.status(200).send({
      meal,
    })
  })

  app.post('/:id', { onRequest: [verifyJWT] }, async (request, reply) => {
    const findMealByIdSchema = z.object({
      id: z.string().uuid(),
    })
    const updateMealByIdSchema = z.object({
      name: z.string().nonempty(),
      description: z.string(),
      dateTime: z.string().datetime(),
      dietPart: z.boolean(),
    })

    const { id } = findMealByIdSchema.parse(request.params)

    const meal = await db('meals').select('*').where('id', id)

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    const { name, description, dateTime, dietPart } =
      updateMealByIdSchema.parse(request.body)

    await db('meals')
      .update({ name, description, date_time: dateTime, diet_part: dietPart })
      .where('id', id)

    return reply.status(200).send({
      name,
      description,
      dateTime,
      dietPart,
    })
  })
}
