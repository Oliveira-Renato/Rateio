"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantsRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function participantsRoutes(app) {
    app.get('/participants', async (request, reply) => {
        const groupSchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { userId } = groupSchema.parse(request.query);
            if (!userId) {
                return reply.status(401).send(); // Forbidden
            }
            const participants = await prisma_1.prisma.participant.findMany();
            return participants;
        }
        catch (error) {
            console.error('Error parsing request body:', error);
            return reply.status(400).send('Bad Request'); // Bad Request if parsing fails
        }
    });
    app.get('/participants/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const querySchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { id } = paramsSchema.parse(request.params);
            const { userId } = querySchema.parse(request.query);
            const participant = await prisma_1.prisma.participant.findUnique({
                where: { id },
            });
            if (!participant || participant.userId !== userId) {
                return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞 ');
            }
            return participant;
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(400).send('Bad Request');
        }
    });
    app.post('/participants', async (request, reply) => {
        const bodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            groupId: zod_1.z.string().uuid(),
            userId: zod_1.z.string(),
            expense: zod_1.z.number(),
        });
        try {
            const { name, groupId, userId, expense } = bodySchema.parse(request.body);
            const user = await prisma_1.prisma.user.findUnique({
                where: {
                    googleId: userId,
                },
            });
            if (!user) {
                return reply.status(401).send('Usuário inválido ou não autenticado 😠');
            }
            const participant = await prisma_1.prisma.participant.create({
                data: {
                    name,
                    userId,
                    groupId,
                    expense
                },
            });
            return participant;
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(500).send('Erro interno do servidor');
        }
    });
    app.put('/participants/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const querySchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        const bodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            expense: zod_1.z.number()
        });
        try {
            const { id } = paramsSchema.parse(request.params);
            const { userId } = querySchema.parse(request.query);
            const { name } = bodySchema.parse(request.body);
            const { expense } = bodySchema.parse(request.body);
            let participant = await prisma_1.prisma.participant.findUnique({
                where: {
                    id,
                }
            });
            if (!participant || participant.userId !== userId) {
                return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
            }
            participant = await prisma_1.prisma.participant.update({
                where: {
                    id,
                },
                data: {
                    name,
                    expense
                },
            });
            return participant;
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(500).send('Erro interno do servidor');
        }
    });
    app.delete('/participants/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const bodySchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { id } = paramsSchema.parse(request.params);
            const { userId } = bodySchema.parse(request.body);
            let participant = await prisma_1.prisma.participant.findUnique({
                where: {
                    id,
                }
            });
            if (!participant || participant.userId !== userId) {
                return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
            }
            await prisma_1.prisma.participant.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(500).send('Erro interno do servidor');
        }
    });
}
exports.participantsRoutes = participantsRoutes;
