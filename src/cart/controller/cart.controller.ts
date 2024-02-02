import { Request, Response } from 'express'
import { CartService, CartValidation } from '../service/cart.service'
import { prisma } from '../../..'

const validation = new CartValidation()
const service = new CartService()

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const data = await service.obtainCart(id)
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unexpected server error' })
  }
}

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params
  const data = req.body
  try {
    if (data.length < 1 && !(await validation.existsPrudcts(data))) {
      res.status(404).json({ message: 'Productos sin stock' })
      return
    }
    await service.addToCart(data, userId)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unexpected server error' })
  }
}

export const clearCart = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const myCart =  await prisma.cart.findFirst({ where: { userId:userId } })
    if (myCart) {
       await service.deleteCart(myCart.id)
      res.sendStatus(204)
    }else{
      res.sendStatus(404).json({message:'Carrito inexistente.'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unexpected server error' })
  }
}
