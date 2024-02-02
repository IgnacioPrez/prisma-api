"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const tokenGenerator = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '20d',
        }, (err, token) => {
            if (err) {
                reject('Error in token creation');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.tokenGenerator = tokenGenerator;
