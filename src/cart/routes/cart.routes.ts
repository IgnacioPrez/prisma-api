import { Router } from "express"
import { getCart ,addProduct, clearCart} from "../controller/cart.controller"

const router = Router()


router.get('/:userId',getCart)
router.post('/addInCart/:userId',addProduct)
router.delete('/removeCart/:userId',clearCart)


export default router