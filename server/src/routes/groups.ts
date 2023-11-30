import { FastifyInstance, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

enum HttpStatus {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  InternalServerError = 500,
}

async function handleErrors(reply: FastifyReply, statusCode: HttpStatus, message: string): Promise<void> {
  console.error(`Error: ${statusCode} - ${message}`);
  return reply.status(statusCode).send(message);
}

export async function groupsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/groups', async (request, reply) => {
    const groupSchema = z.object({
      userId: z.string(),
    });

    try {
      const { userId } = groupSchema.parse(request.query);

      if (!userId) {
        return handleErrors(reply, HttpStatus.Unauthorized, 'Usuário não autenticado');
      }

      const groups = await prisma.group.findMany();
      return groups;
    } catch (error) {
      return handleErrors(reply, HttpStatus.BadRequest, 'Erro na solicitação');
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
        where: {
          id,
        },
        include: {
          participants: true
        },
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

    const querySchema = z.object({
      userId: z.string(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);

      let group = await prisma.group.findUnique({
        where: {
          id,
        },
        include: {
          participants: true
        },
      });

      if (!group || group.userId !== userId) {
        return handleErrors(reply, HttpStatus.Unauthorized, 'Não autorizado ou grupo não existe');
      }

      // Exclua os participantes do grupo
      await prisma.participant.deleteMany({
        where: {
          groupId: id,
        },
      });

      // Finalmente, exclua o grupo
      await prisma.group.delete({
        where: {
          id,
        },
      });

      return reply.status(HttpStatus.Ok).send('Grupo excluído com sucesso');
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(HttpStatus.InternalServerError).send('Erro interno do servidor');
    }
  });
}