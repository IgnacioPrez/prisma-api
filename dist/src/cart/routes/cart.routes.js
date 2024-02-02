"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart.controller");
const router = (0, express_1.Router)();
router.get('/:userId', cart_controller_1.getCart);
router.post('/addInCart/:userId', cart_controller_1.addProduct);
router.delete('/removeCart/:userId', cart_controller_1.clearCart);
exports.default = router;
