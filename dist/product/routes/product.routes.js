"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_validator_1 = require("express-validator");
const collectBugs_1 = require("../../middlewares/collectBugs");
const isImage_1 = require("../../middlewares/isImage");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.AllProducts);
router.post('/create', (0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: './temp',
}), [
    (0, express_validator_1.check)('name', 'El producto debe contener un nombre de almenos 4').isString().notEmpty().isLength({ min: 4 }),
    (0, express_validator_1.check)('description', 'El producto debe contener una descripción').isString().notEmpty().isLength({ min: 10 }),
    (0, express_validator_1.check)('price', 'El producto debe contener un precio').notEmpty(),
    (0, express_validator_1.check)('quantity', 'Deben existir unidades del producto').notEmpty(),
    (0, express_validator_1.check)('categoriesId', 'El producto debe pertenecer a una categoria').notEmpty().isUUID(),
    isImage_1.isImage,
    collectBugs_1.collectBugs,
], product_controller_1.createProduct);
router.get('/:id', product_controller_1.getProductsByFilter);
router.delete('/delete/:id', product_controller_1.deleteProduct);
exports.default = router;
