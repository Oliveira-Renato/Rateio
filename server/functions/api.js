const fastify = require('fastify');
const cors = require('@fastify/cors');
const serverless = require('serverless-http');
const { userRoutes } = require('../src/routes/users');
const { groupsRoutes } = require('../src/routes/groups');
const { participantsRoutes } = require('../src/routes/participants');
const { registerUser } = require('../src/routes/register');

const app = fastify({ logger: true });

const allowedOrigins = [
  'https://rateio-server.netlify.app',
  'https://rateio-app.vercel.app'
];

// Configuração do middleware CORS
app.register(cors, {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir envio de cookies e cabeçalhos de autenticação
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
