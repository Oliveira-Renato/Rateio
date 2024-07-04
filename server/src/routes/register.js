"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const host = 'http://localhost:3333';
async function registerUser(app) {
    app.post('/register', async (request, res) => {
        try {
            const userSchema = zod_1.z.object({
                id: zod_1.z.string(),
                email: zod_1.z.string(),
                name: zod_1.z.string(),
                avatar_url: zod_1.z.string().url(),
            });
            const userInfo = userSchema.parse(request.body);
            let user = await prisma_1.prisma.user.findUnique({
                where: {
                    googleId: userInfo.id,
                },
            });
            if (!user) {
                user = await prisma_1.prisma.user.create({
                    data: {
                        googleId: userInfo.id,
                        email: userInfo.email,
                        name: userInfo.name,
                        avatarUrl: userInfo.avatar_url,
                    },
                });
                res.send('Usuario cadastrado com sucesso!');
            }
            else {
                const { data: groups } = await axios_1.default.get(`${host}/groups?userId=${userInfo.id}`);
                res.send(groups);
            }
        }
        catch (error) {
            // Handle errors appropriately
            console.error(error);
            throw new Error('Failed to register user');
        }
    });
}
exports.registerUser = registerUser;
