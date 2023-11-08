import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    try {
      const bodySchema = z.object({
        code: z.string(),
      });
      const { code } = bodySchema.parse(request.body);

      const params = new URLSearchParams();
      params.append('client_id', encodeURIComponent(process.env.GOOGLE_CLIENT_ID ?? ''));
      params.append('client_secret', encodeURIComponent(process.env.GOOGLE_CLIENT_SECRET ?? ''));
      params.append('code', encodeURIComponent(code));
      params.append('grant_type', encodeURIComponent('authorization_code'));

      const accessTokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = accessTokenResponse.data;

      // Save the access token or use it for further operations
      // Example: await prisma.user.update({ where: { id: userId }, data: { accessToken: access_token } });

      return {
        access_token,
      };
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      throw new Error('Failed to register user');
    }
  });
}
