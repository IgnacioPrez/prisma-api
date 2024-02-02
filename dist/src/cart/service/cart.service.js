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
exports.CartValidation = exports.CartService = void 0;
const __1 = require("../../..");
class CartService {
    obtainCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield __1.prisma.cart.findFirst({
                where: {
                    userId,
                },
                include: {
                    items: true,
                },
            });
            return data;
        });
    }
    addToCart(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalQuantity = data.map((values) => values.quantity).reduce((acc, el) => acc + el, 0);
            const totalPrice = data.map((values) => values.price * values.quantity).reduce((acc, el) => acc + el);
            const result = yield __1.prisma.cart.create({
                data: {
                    userId,
                    items: {
                        create: data.map((values) => ({
                            name: values.name,
                            price: values.price * values.quantity,
                            quantity: values.quantity,
                            image: values.image,
                        })),
                    },
                    quantity: totalQuantity,
                    total: totalPrice,
                },
            });
            console.log(result);
            return result;
        });
    }
    deleteCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.prisma.cartItem.deleteMany({
                where: {
                    cartId,
                },
            });
            return yield __1.prisma.cart.delete({
                where: {
                    id: cartId,
                },
            });
        });
    }
}
exports.CartService = CartService;
class CartValidation {
    existsPrudcts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield __1.prisma.product.findMany({
                where: {
                    id: {
                        in: data.map((entry) => entry.id),
                    },
                    stock: true,
                },
            });
            return result;
        });
    }
}
exports.CartValidation = CartValidation;
