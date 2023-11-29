import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function participantsRoutes(app: FastifyInstance) {
  app.get('/participants', async (request, reply) => {
    const groupSchema = z.object({
      userId: z.string(),
    });

    try {
      const { userId } = groupSchema.parse(request.query);

      if (!userId) {
        return reply.status(401).send(); // Forbidden
      }

      const participants = await prisma.participant.findMany();
      return participants;
    } catch (error) {
      console.error('Error parsing request body:', error);
      return reply.status(400).send('Bad Request'); // Bad Request if parsing fails
    }
  });


  app.get('/participants/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const querySchema = z.object({
      userId: z.string(),
    });


    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);

      const participant = await prisma.participant.findUnique({
        where: { id },
      });

      if (!participant || participant.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞 ');
      }

      return participant;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(400).send('Bad Request');
    }
  });


  app.post('/participants', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      groupId: z.string().uuid(),
      userId: z.string(),
      expense: z.number(),
    });

    try {
      const { name, groupId, userId, expense } = bodySchema.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          googleId: userId,
        },
      });

      if (!user) {
        return reply.status(401).send('Usuário inválido ou não autenticado 😠');
      }

      const participant = await prisma.participant.create({
        data: {
          name,
          userId,
          groupId,
          expense
        },
      });

      return participant;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });


  app.put('/participants/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const querySchema = z.object({
      userId: z.string(),
    });

    const bodySchema = z.object({
      name: z.string(),
      expense: z.number()
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);
      const { name } = bodySchema.parse(request.body);
      const { expense } = bodySchema.parse(request.body);

      let participant = await prisma.participant.findUnique({
        where: {
          id,
        }
      });

      if (!participant || participant.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
      }

      participant = await prisma.participant.update({
        where: {
          id,
        },
        data: {
          name,
          expense
        },
      })

      return participant;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });


  app.delete('/participants/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      userId: z.string(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = bodySchema.parse(request.body);

      let participant = await prisma.participant.findUnique({
        where: {
          id,
        }
      });

      if (!participant || participant.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
      }


      await prisma.participant.delete({
        where: {
          id,
        },
      })

    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });
}