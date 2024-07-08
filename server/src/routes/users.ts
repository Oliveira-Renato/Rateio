import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user", async (request, reply) => {
    const groupSchema = z.object({
      userId: z.string().optional(),
    });

    try {
      console.log("Request Query:", request.query); // Log para depuração
      const { userId } = groupSchema.parse(request.query);

      if (!userId) {
        return reply.status(401).send("User ID is required"); // Forbidden
      }

      console.log("User ID:", userId); // Log do userId para depuração
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("Error parsing request body:", error);
      return reply.status(400).send("Bad Request: " + error.message); // Bad Request if parsing fails
    }
  });

  app.get("/user/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    try {
      console.log("Request Params:", request.params); // Log para depuração
      const { id: googleId } = paramsSchema.parse(request.params);

      console.log("Google ID:", googleId); // Log do googleId para depuração
      const user = await prisma.user.findUnique({
        where: { googleId },
        include: {
          groups: {
            include: {
              participants: true,
            },
          },
        },
      });

      if (!user) {
        return reply
          .status(401)
          .send("Unauthorized or user does not exist! 😞");
      }

      console.log("User Data:", user); // Log para verificação dos dados do usuário
      return user;
    } catch (error) {
      console.error("Error processing request:", error);
      return reply.status(400).send("Bad Request: " + error.message);
    }
  });
}
