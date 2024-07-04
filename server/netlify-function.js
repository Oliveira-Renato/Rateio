import { Handler } from '@netlify/functions';
import fastify from 'fastify';
import cors from '@fastify/cors'
import { userRoutes } from './src/routes/users';
import { groupsRoutes } from './src/routes/groups'
import { participantsRoutes } from './src/routes/participants'
import { registerUser } from './src/routes/register'

const app = fastify({ logger: true });

app.register(cors, {
  origin: true,
})

app.register(userRoutes);
app.register(groupsRoutes);
app.register(participantsRoutes);
app.register(registerUser);

export const handler = async (event, context) => {
  await app.ready();
  const result = await app.inject({
    method: event.httpMethod,
    url: event.path,
    query: event.queryStringParameters,
    headers: event.headers,
    payload: event.body,
  });

  return {
    statusCode: result.statusCode,
    headers: result.headers,
    body: result.payload,
  };
};
