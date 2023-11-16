import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function groupsRoutes(app: FastifyInstance) {
  app.get('/groups', async (request, reply) => {
    const groupSchema = z.object({
      userId: z.string(),
    });

    try {
      const { userId } = groupSchema.parse(request.query);

      if (!userId) {
        return reply.status(401).send(); // Forbidden
      }

      const groups = await prisma.group.findMany();
      return groups;
    } catch (error) {
      console.error('Error parsing request body:', error);
      return reply.status(400).send('Bad Request'); // Bad Request if parsing fails
    }
  });


  app.get('/groups/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const querySchema = z.object({
      userId: z.string(),
    });


    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);

      const group = await prisma.group.findUnique({
        where: { id },
      });

      if (!group || group.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞 ');
      }

      return group;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(400).send('Bad Request');
    }
  });


  app.post('/groups', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      userId: z.string(),
    });

    try {
      const { name, userId } = bodySchema.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          googleId: userId,
        },
      });

      if (!user) {
        return reply.status(401).send('Usuário inválido ou não autenticado 😠');
      }

      const group = await prisma.group.create({
        data: {
          name,
          userId,
        },
      });

      return group;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });


  app.put('/groups/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const querySchema = z.object({
      userId: z.string(),
    });

    const bodySchema = z.object({
      name: z.string(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);
      const { name } = bodySchema.parse(request.body);

      let group = await prisma.group.findUnique({
        where: {
          id,
        }
      });

      if (!group || group.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
      }

      group = await prisma.group.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })

      return group;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });


  app.delete('/groups/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      userId: z.string(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = bodySchema.parse(request.body);

      let group = await prisma.group.findUnique({
        where: {
          id,
        }
      });

      if (!group || group.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
      }

      await prisma.group.delete({
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