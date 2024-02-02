import { prisma } from '../../..'
import { IProduct } from '../../product/model/product'

export class CartService {
  async obtainCart(userId: string) {
    const data = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    })
    return data
  }

  async addToCart(data: IProduct[], userId: string) {
    const totalQuantity = data.map((values) => values.quantity).reduce((acc, el) => acc + el, 0)
    const totalPrice = data.map((values) => values.price * values.quantity).reduce((acc, el) => acc + el)
    const result = await prisma.cart.create({
      data: {
        userId,
        items: {
          create: data.map((values: any) => ({
            name: values.name,
            price: values.price * values.quantity,
            quantity: values.quantity,
            image: values.image,
          })),
        },
        quantity: totalQuantity,
        total: totalPrice,
      },
    })
    console.log(result)
    return result
  }

  async deleteCart(cartId: string) {
    await prisma.cartItem.deleteMany({
      where: {
        cartId,
      },
    })

    return await prisma.cart.delete({
      where: {
        id: cartId,
      },
    })
  }
}

export class CartValidation {
  async existsPrudcts(data: IProduct[]) {
    const result = await prisma.product.findMany({
      where: {
        id: {
          in: data.map((entry) => entry.id),
        },
        stock: true,
      },
    })

    return result
  }
}
