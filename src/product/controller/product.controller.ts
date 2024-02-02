import { Request, Response } from 'express'
import { ProductService, ValidationProduct } from '../service/product.service'

const service = new ProductService()
const validations = new ValidationProduct()

export const AllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await service.listProducts()
    res.status(200).json({ data })
  } catch (err) {
    res.status(500)
    throw new Error('Unexpected server error')
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const image: any = req.files?.image
  const restOfDataProduct = req.body
  try {
    if (await validations.existProduct(restOfDataProduct)) {
      res.status(400).json({ message: 'El producto ya existe en la base de datos.' })
    }
    const data = await service.addProduct(restOfDataProduct, image)
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unexpected server error' })
  }
}

export const getProductsByFilter = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const data = await service.listProductsByFilter(id)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ message: 'Unexpected server error' })
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    if (!(await validations.findProduc(id))) {
      res.status(404).json({ message: 'Este producto no existe en la base de datos' })
      return
    }
    await service.deleteProductFromDb(id)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ message: 'Unexpected server error' })
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const data = req.body
  try {
    if (!(await validations.findProduc(id))) {
      res.status(404).json({ message: 'Este producto no existe en la base de datos.' })
      return
    }
    if (Object.values(data).length === 0) {
      res.status(400).json({ message: 'Requiere datos adicionales.' })
      return
    }
    await service.updateProduct(id, data)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unexpected server error' })
  }
}
