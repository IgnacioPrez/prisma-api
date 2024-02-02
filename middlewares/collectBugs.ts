import { validationResult } from 'express-validator'
import { Request, NextFunction, Response } from 'express'
import fs from 'fs-extra'

export const collectBugs = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    if (req.files) {
      const image: any = req.files.image
      await fs.unlink(image.tempFilePath)
    }
    res.status(400).json(errors)
    return
  } else {
    next()
  }
}
