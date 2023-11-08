import 'dotenv/config'

import fastify from "fastify"
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'
import { authTeste } from './routes/teste'
import { revokeToken } from './routes/revoke'

const app = fastify()

app.register(cors, {
  origin: true, //true : todos URLs de front-end pode acessar esse back-end. prodution: use ['http://localhost:3000','url',...]
})
app.register(authRoutes)
app.register(revokeToken)

app.listen({
  port: 3333,
}).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3333')
})

