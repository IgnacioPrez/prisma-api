"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
const zod_form_data_1 = require("zod-form-data");
// export const productSchema = z.object({
//     body:z.object({
//         name: z.string().min(5,{
//             message:'El nombre debe ser mayor a 5 caracteres'
//         }),
//         description :z.string().min(10,{message:'La descripción debe ser mayor a 10 caracteres'}),
//         price: z.number().gte(2000,{
//             message:'El precio debe ser como mínimo 2000'
//         }).nonnegative().finite(),
//         quantity: z.number().gte(10,{
//             message:'La cantidad mínima esperada es de 10 unidades'
//         }).nonnegative().finite(),
//         categoriesId: z.string().uuid(),
//         image: z.object({
//             name: z.string(),
//             data: z.any(),
//             size: z.number(),
//             encoding: z.string(),
//             tempFilePazth: z.string(),
//             truncated:z.boolean(),
//             mimetype: z.string(),
//             md5: z.string()
//         }).required()
//     })
// })
exports.productSchema = zod_1.z.object({
    body: zod_form_data_1.zfd.formData({
        name: zod_1.z.string().min(5, {
            message: 'El nombre debe ser mayor a 5 caracteres'
        }),
        description: zod_1.z.string().min(10, { message: 'La descripción debe ser mayor a 10 caracteres' }),
        price: zod_1.z.number().gte(2000, {
            message: 'El precio debe ser como mínimo 2000'
        }).nonnegative().finite(),
        quantity: zod_1.z.number().gte(10, {
            message: 'La cantidad mínima esperada es de 10 unidades'
        }).nonnegative().finite(),
        categoriesId: zod_1.z.string().uuid(),
        image: zod_1.z.object({
            name: zod_1.z.string(),
            data: zod_1.z.any(),
            size: zod_1.z.number(),
            encoding: zod_1.z.string(),
            tempFilePazth: zod_1.z.string(),
            truncated: zod_1.z.boolean(),
            mimetype: zod_1.z.string(),
            md5: zod_1.z.string()
        }).required()
    })
});
