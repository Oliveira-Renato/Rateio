"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function userRoutes(app) {
    app.get('/user', async (request, reply) => {
        const groupSchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { userId } = groupSchema.parse(request.query);
            if (!userId) {
                return reply.status(401).send(); // Forbidden
            }
            const users = await prisma_1.prisma.user.findMany();
            return users;
        }
        catch (error) {
            console.error('Error parsing request body:', error);
            return reply.status(400).send('Bad Request'); // Bad Request if parsing fails
        }
    });
    app.get('/user/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string(),
        });
        try {
            const { id: googleId } = paramsSchema.parse(request.params);
            const user = await prisma_1.prisma.user.findUnique({
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
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(400).send('Bad Request');
        }
    });
}
exports.userRoutes = userRoutes;
