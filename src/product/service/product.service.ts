import { UploadedFile } from 'express-fileupload'
import { IProduct, IFiles } from '../model/product'
import { deleteImage, uploadImage } from '../../../helpers/cloudinary'
import { prisma } from '../../..'
import fs from 'fs-extra'

export class ProductService {
  async addProduct(data: IProduct, existPathImage: UploadedFile | IFiles) {
    const result = await uploadImage(existPathImage.tempFilePath)
    const product = await prisma.product.create({
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
    })
    await fs.unlink(existPathImage.tempFilePath)

    return product
  }
  async listProducts() {
    const res = await prisma.product.findMany()
    return res
  }

  async listProductsByFilter(id: string) {
    const res = await prisma.product.findMany({
      where: {
        categoriesId: id,
      },
    })
    return res
  }

  async deleteProductFromDb(productId: string) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    })

    if (product?.image && typeof product.image === 'object' && 'public_id' in product.image) {
      await deleteImage(product.image.public_id as string)
    }
    await prisma.product.delete({
      where: {
        id: productId,
      },
    })
  }

  async updateProduct(productId: string, dataProduct: IProduct) {
    const product = await prisma.product.findFirst({
      where:{
        id:productId
      }
    })
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        price: dataProduct?.price,
        quantity: dataProduct?.quantity,
        name: dataProduct?.name,
        description: dataProduct?.description,
        stock: dataProduct.quantity > 0 || (product?.quantity as number > 0),
        categoriesId:dataProduct.categoriesId,
      },
    })
  }
}

export class ValidationProduct {
  async existProduct(data: IProduct) {
    return await prisma.product.findUnique({
      where: {
        name: data.name,
      },
    })
  }
  async findProduc(id: string) {
    return await prisma.product.findFirst({
      where: { id },
    })
  }
}
