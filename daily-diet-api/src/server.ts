import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { userRoutes } from './routes/users'
import { mealRoutes } from './routes/meals'
import { sessionRoute } from './routes/session'
import { meRoute } from './routes/me'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes, {
  prefix: 'users',
})
app.register(sessionRoute, {
  prefix: 'sessions',
})
app.register(meRoute, {
  prefix: 'me',
})
app.register(mealRoutes, {
  prefix: 'meals',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('App running'))
