const fastify = require('fastify');
const cors = require('@fastify/cors');
const serverless = require('serverless-http');
const { userRoutes } = require('../src/routes/users');
const { groupsRoutes } = require('../src/routes/groups');
const { participantsRoutes } = require('../src/routes/participants');
const { registerUser } = require('../src/routes/register');

const app = fastify({ logger: true });

app.register(cors, {
  origin: true,
});

// Adiciona o prefixo '/.netlify/functions/api' a todas as rotas
app.register(async function (app) {
  app.get('/', async (request, reply) => {
    return { message: 'API is working!' };
  });

  // Rotas principais com logs
  app.register(userRoutes);
  app.register(groupsRoutes);
  app.register(participantsRoutes);
  app.register(registerUser);

}, { prefix: '/.netlify/functions/api' });

module.exports.handler = serverless(app);
