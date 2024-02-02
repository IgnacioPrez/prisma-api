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
exports.clearCart = exports.addProduct = exports.getCart = void 0;
const cart_service_1 = require("../service/cart.service");
const __1 = require("../../..");
const validation = new cart_service_1.CartValidation();
const service = new cart_service_1.CartService();
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield service.obtainCart(id);
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.getCart = getCart;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = req.body;
    try {
        if (data.length < 1 && !(yield validation.existsPrudcts(data))) {
            res.status(404).json({ message: 'Productos sin stock' });
            return;
        }
        yield service.addToCart(data, userId);
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.addProduct = addProduct;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const myCart = yield __1.prisma.cart.findFirst({ where: { userId: userId } });
        if (myCart) {
            yield service.deleteCart(myCart.id);
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404).json({ message: 'Carrito inexistente.' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.clearCart = clearCart;
