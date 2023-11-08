import { FastifyInstance, FastifyRequest } from 'fastify';

export async function authTeste(app: FastifyInstance) {
  app.get('/api/auth/callback/google', async (request: FastifyRequest) => {
    const { code }: any = request.query; // Obtém o código de autorização da consulta de URL
    console.log(code)

  });
}