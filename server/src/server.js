"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const register_1 = require("./routes/register");
const groups_1 = require("./routes/groups");
const participants_1 = require("./routes/participants");
const users_1 = require("./routes/users");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: true, //true : todos URLs de front-end pode acessar esse back-end. prodution: use ['http://localhost:3000','url',...]
});
app.register(register_1.registerUser);
app.register(groups_1.groupsRoutes);
app.register(participants_1.participantsRoutes);
app.register(users_1.userRoutes);
app.listen({
    port: 3333,
}).then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333');
});
