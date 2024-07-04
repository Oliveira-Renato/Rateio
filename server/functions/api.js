import fastify from 'fastify';
import cors from '@fastify/cors'
import serverless from 'serverless-http'
import { userRoutes } from '../src/routes/users';
import { groupsRoutes } from '../src/routes/groups'
import { participantsRoutes } from '../src/routes/participants'
import { registerUser } from '../src/routes/register'

const app = fastify({ logger: true });

app.register(cors, {
  origin: true,
})

app.register(userRoutes);
app.register(groupsRoutes);
app.register(participantsRoutes);
app.register(registerUser);

export const handler = serverless(app);
