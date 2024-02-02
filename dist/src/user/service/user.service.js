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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.UserService = void 0;
const __1 = require("../../..");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../../../helpers/generateToken");
class UserService {
    create(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcryptjs_1.default.genSaltSync();
            const newPassword = bcryptjs_1.default.hashSync(password, salt);
            const user = yield __1.prisma.user.create({
                data: {
                    email: email,
                    password: newPassword,
                },
            });
            return user;
        });
    }
    loggUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = '';
            const user = yield __1.prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (user) {
                const data = yield (0, generateToken_1.tokenGenerator)(user.id);
                token = data;
            }
            return { token, user };
        });
    }
}
exports.UserService = UserService;
class UserValidation {
    existUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return __1.prisma.user.findFirst({
                where: {
                    email,
                },
            });
        });
    }
    isPasswordValid(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prisma.user.findFirst({
                where: {
                    email,
                },
            });
            const verifiedPassword = bcryptjs_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
            return verifiedPassword;
        });
    }
}
exports.UserValidation = UserValidation;
