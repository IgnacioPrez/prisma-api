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
exports.deleteProduct = exports.getProductsByFilter = exports.createProduct = exports.AllProducts = void 0;
const product_service_1 = require("../service/product.service");
const service = new product_service_1.ProductService();
const validations = new product_service_1.ValidationProduct();
const AllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service.listProducts();
        res.status(200).json({ data });
    }
    catch (err) {
        res.status(500);
        throw new Error('Unexpected server error');
    }
});
exports.AllProducts = AllProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    const restOfDataProduct = req.body;
    try {
        if (yield validations.existProduct(restOfDataProduct)) {
            res.status(400).json({ message: 'El producto ya existe en la base de datos.' });
        }
        const data = yield service.addProduct(restOfDataProduct, image);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.createProduct = createProduct;
const getProductsByFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield service.listProductsByFilter(id);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.getProductsByFilter = getProductsByFilter;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!(yield validations.findProduc(id))) {
            res.status(404).json({ message: 'Este producto no existe en la base de datos' });
            return;
        }
        yield service.deleteProductFromDb(id);
        res.status(204).json({ message: 'Producto eliminado de la base de datos' });
    }
    catch (err) {
        res.status(500).json({ message: 'Unexpected server error' });
    }
});
exports.deleteProduct = deleteProduct;
