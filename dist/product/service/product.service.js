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
exports.ValidationProduct = exports.ProductService = void 0;
const cloudinary_1 = require("../../helpers/cloudinary");
const __1 = require("../..");
const fs_extra_1 = __importDefault(require("fs-extra"));
class ProductService {
    addProduct(data, existPathImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, cloudinary_1.uploadImage)(existPathImage.tempFilePath);
            const product = yield __1.prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: Number(data.price),
                    image: {
                        public_id: result.public_id,
                        url: result.secure_url,
                    },
                    quantity: Number(data.quantity),
                    stock: Number(data.quantity) > 0 ? true : false,
                    categoriesId: data.categoriesId,
                },
            });
            yield fs_extra_1.default.unlink(existPathImage.tempFilePath);
            return product;
        });
    }
    listProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield __1.prisma.product.findMany();
            return res;
        });
    }
    listProductsByFilter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield __1.prisma.product.findMany({
                where: {
                    categoriesId: id,
                },
            });
            return res;
        });
    }
    deleteProductFromDb(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield __1.prisma.product.findFirst({
                where: {
                    id: productId
                }
            });
            if ((product === null || product === void 0 ? void 0 : product.image) && typeof product.image === 'object' && 'public_id' in product.image) {
                yield (0, cloudinary_1.deleteImage)(product.image.public_id);
            }
            yield __1.prisma.product.delete({
                where: {
                    id: productId
                }
            });
        });
    }
}
exports.ProductService = ProductService;
class ValidationProduct {
    existProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __1.prisma.product.findUnique({
                where: {
                    name: data.name,
                },
            });
        });
    }
    findProduc(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __1.prisma.product.findFirst({
                where: { id }
            });
        });
    }
}
exports.ValidationProduct = ValidationProduct;
