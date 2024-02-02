"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("../src/product/routes/product.routes"));
const cart_routes_1 = __importDefault(require("../src/cart/routes/cart.routes"));
const user_routes_1 = __importDefault(require("../src/user/routes/user.routes"));
(0, dotenv_1.config)();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.productRoutes = '/product';
        this.userRoutes = '/user';
        this.cartRoutes = '/cart';
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en el puerto ${this.port}`);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.productRoutes, product_routes_1.default);
        this.app.use(this.cartRoutes, cart_routes_1.default);
        this.app.use(this.userRoutes, user_routes_1.default);
    }
}
exports.Server = Server;
