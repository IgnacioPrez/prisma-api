"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const user_service_1 = require("../service/user.service");
const service = new user_service_1.UserService();
const validate = new user_service_1.UserValidation();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (yield validate.existUser(email)) {
            res.status(400).json({ mesage: 'The user already exists' });
            return;
        }
        const user = yield service.create(email, password);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const [existUser, passwordValid] = yield Promise.all([
            validate.existUser(email),
            validate.isPasswordValid(email, password),
        ]);
        if (!existUser) {
            res.status(404).json({ mesage: 'The user already existsThis user does not exist ' });
            return;
        }
        if (!passwordValid) {
            res.status(404).json({ message: 'Incorrect password' });
            return;
        }
        const { user, token } = yield service.loggUser(email);
        res.status(200).json({
            user,
            token
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.login = login;
