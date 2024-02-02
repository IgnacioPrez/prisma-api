"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const server_1 = require("./model/server");
const client_1 = require("@prisma/client");
const cloudinary_1 = require("cloudinary");
exports.prisma = new client_1.PrismaClient();
function main() {
    const server = new server_1.Server();
    server.listen();
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_NICK,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
        secure: true,
    });
}
main();
