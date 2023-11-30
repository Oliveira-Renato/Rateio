import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user', async (request, reply) => {
    const groupSchema = z.object({
      userId: z.string(),
    });

    try {
      const { userId } = groupSchema.parse(request.query);

      if (!userId) {
        return reply.status(401).send(); // Forbidden
      }

      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Error parsing request body:', error);
      return reply.status(400).send('Bad Request'); // Bad Request if parsing fails
    }
  });

  app.get('/user/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    try {
      const { id: googleId } = paramsSchema.parse(request.params);

      const user = await prisma.user.findUnique({
        where: { googleId },
        include: {
          groups: {
            include: {
              participants: true
            }
          }
        }
      });

      if (!user) {
        return reply.status(401).send('Não autorizado ou não existe tal usuario! 😞 ');
      }

      return user;

    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(400).send('Bad Request');
    }
  });
}