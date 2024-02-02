import { Router } from 'express'
import { AllProducts, createProduct, deleteProduct, getProductsByFilter, updateProduct } from '../controller/product.controller'
import fileUpload from 'express-fileupload'
import { check } from 'express-validator'
import { collectBugs } from '../../../middlewares/collectBugs'
import { isImage } from '../../../middlewares/isImage'

const router = Router()

router.get('/', AllProducts)

router.post(
  '/create',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './temp',
  }),
  [
    check('name', 'El producto debe contener un nombre de almenos 4').isString().notEmpty().isLength({ min: 4 }),
    check('description', 'El producto debe contener una descripción').isString().notEmpty().isLength({ min: 10 }),
    check('price', 'El producto debe contener un precio').notEmpty(),
    check('quantity', 'Deben existir unidades del producto').notEmpty(),
    check('categoriesId', 'El producto debe pertenecer a una categoria').notEmpty().isUUID(),
    isImage,
    collectBugs,
  ],

  createProduct
)

router.get('/:id',getProductsByFilter)

router.delete('/delete/:id',deleteProduct)

router.patch('/update/:id',updateProduct)


export default router
