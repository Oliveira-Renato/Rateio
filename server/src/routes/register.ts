import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function registerUser(app: FastifyInstance) {
  app.post('/register', async (request, res) => {
    try {
      const userSchema = z.object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
      })

      const userInfo = userSchema.parse(request.body);

      let user = await prisma.user.findUnique({
        where: {
          googleId: userInfo.id,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            googleId: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            avatarUrl: userInfo.avatar_url,
          },
        })
      } else {
        res.send('Usuario já cadastrado')
      }

    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      throw new Error('Failed to register user');
    }
  });
}
