"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatus || (HttpStatus = {}));
async function handleErrors(reply, statusCode, message) {
    console.error(`Error: ${statusCode} - ${message}`);
    return reply.status(statusCode).send(message);
}
async function groupsRoutes(app) {
    app.get('/groups', async (request, reply) => {
        const groupSchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { userId } = groupSchema.parse(request.query);
            if (!userId) {
                return handleErrors(reply, HttpStatus.Unauthorized, 'Usuário não autenticado');
            }
            const groups = await prisma_1.prisma.group.findMany();
            return groups;
        }
        catch (error) {
            return handleErrors(reply, HttpStatus.BadRequest, 'Erro na solicitação');
        }
    });
    app.get('/groups/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const querySchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { id } = paramsSchema.parse(request.params);
            const { userId } = querySchema.parse(request.query);
            const group = await prisma_1.prisma.group.findUnique({
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
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(400).send('Bad Request');
        }
    });
    app.post('/groups', async (request, reply) => {
        const bodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            userId: zod_1.z.string(),
        });
        try {
            const { name, userId } = bodySchema.parse(request.body);
            const user = await prisma_1.prisma.user.findUnique({
                where: {
                    googleId: userId,
                },
            });
            if (!user) {
                return reply.status(401).send('Usuário inválido ou não autenticado 😠');
            }
            const group = await prisma_1.prisma.group.create({
                data: {
                    name,
                    userId,
                },
            });
            return group;
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(500).send('Erro interno do servidor');
        }
    });
    app.put('/groups/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const querySchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        const bodySchema = zod_1.z.object({
            name: zod_1.z.string(),
        });
        try {
            const { id } = paramsSchema.parse(request.params);
            const { userId } = querySchema.parse(request.query);
            const { name } = bodySchema.parse(request.body);
            let group = await prisma_1.prisma.group.findUnique({
                where: {
                    id,
                }
            });
            if (!group || group.userId !== userId) {
                return reply.status(401).send('Não autorizado ou não existe tal grupo! 😞');
            }
            group = await prisma_1.prisma.group.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
            });
            return group;
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(500).send('Erro interno do servidor');
        }
    });
    app.delete('/groups/:id', async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const querySchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        try {
            const { id } = paramsSchema.parse(request.params);
            const { userId } = querySchema.parse(request.query);
            let group = await prisma_1.prisma.group.findUnique({
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
            await prisma_1.prisma.participant.deleteMany({
                where: {
                    groupId: id,
                },
            });
            // Finalmente, exclua o grupo
            await prisma_1.prisma.group.delete({
                where: {
                    id,
                },
            });
            return reply.status(HttpStatus.Ok).send('Grupo excluído com sucesso');
        }
        catch (error) {
            console.error('Error processing request:', error);
            return reply.status(HttpStatus.InternalServerError).send('Erro interno do servidor');
        }
    });
}
exports.groupsRoutes = groupsRoutes;
