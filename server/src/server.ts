import 'dotenv/config'

import fastify from "fastify"
import cors from '@fastify/cors'
import { registerUser } from './routes/register'
import { groupsRoutes } from './routes/groups'
import { participantsRoutes } from './routes/participants'
import { userRoutes } from './routes/users'

const app = fastify()

app.register(cors, {
  origin: true, //true : todos URLs de front-end pode acessar esse back-end. prodution: use ['http://localhost:3000','url',...]
})

app.register(registerUser)
app.register(groupsRoutes)
app.register(participantsRoutes)
app.register(userRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3333')
})

