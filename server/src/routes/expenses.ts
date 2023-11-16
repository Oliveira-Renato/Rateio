import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function expensesRoutes(app: FastifyInstance) {
  app.get('/expenses', async (request, reply) => {
    const groupSchema = z.object({
      userId: z.string(),
    });

    try {
      const { userId } = groupSchema.parse(request.query);

      if (!userId) {
        return reply.status(401).send(); // Forbidden
      }

      const expenses = await prisma.expense.findMany();
      return expenses;
    } catch (error) {
      console.error('Error parsing request body:', error);
      return reply.status(400).send('Bad Request'); // Bad Request if parsing fails
    }
  });


  app.get('/expenses/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const querySchema = z.object({
      userId: z.string(),
    });


    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);

      const expense = await prisma.expense.findUnique({
        where: { id },
      });

      if (!expense || expense.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞 ');
      }

      return expense;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(400).send('Bad Request');
    }
  });


  app.post('/expenses', async (request, reply) => {
    const bodySchema = z.object({
      value: z.number(),
      groupId: z.string().uuid(),
      participantId: z.string().uuid(),
      userId: z.string(),
    });

    try {
      const { value, groupId, userId, participantId } = bodySchema.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          googleId: userId,
        },
      });

      if (!user) {
        return reply.status(401).send('Usuário inválido ou não autenticado 😠');
      }

      const expense = await prisma.expense.create({
        data: {
          expense: value,
          userId,
          groupId,
          participantId
        },
      });

      return expense;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });


  app.put('/expenses/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const querySchema = z.object({
      userId: z.string(),
    });

    const bodySchema = z.object({
      value: z.number(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = querySchema.parse(request.query);
      const { value } = bodySchema.parse(request.body);

      let expense = await prisma.expense.findUnique({
        where: {
          id,
        }
      });

      if (!expense || expense.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
      }

      expense = await prisma.expense.update({
        where: {
          id,
        },
        data: {
          expense: value,
        },
      })

      return expense;
    } catch (error) {
      console.error('Error processing request:', error);
      return reply.status(500).send('Erro interno do servidor');
    }
  });


  app.delete('/expenses/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      userId: z.string(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const { userId } = bodySchema.parse(request.body);

      let expense = await prisma.expense.findUnique({
        where: {
          id,
        }
      });

      if (!expense || expense.userId !== userId) {
        return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
      }

      await prisma.expense.delete({
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