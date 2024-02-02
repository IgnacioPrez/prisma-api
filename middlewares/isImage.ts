import { NextFunction, Request, Response } from 'express'
import path from 'path'

export const isImage = async (req:Request, res: Response, next: NextFunction): Promise<void> => {
  const {image}: any = req.files
  const extension = path.extname(image?.name).toLowerCase()
  const extensionValid = ['.jpg', '.jpeg', '.png']

  if (!extensionValid.includes(extension)) {
    res.status(415).json({message:`El formato ingresado '${extension}' no es aceptado en la base de datos.`})
    return
  }
  next()
}
