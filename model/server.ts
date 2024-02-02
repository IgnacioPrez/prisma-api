import express, { Express } from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import ProductRoute from '../src/product/routes/product.routes'
import CartRoute from '../src/cart/routes/cart.routes'
import UserRoute from '../src/user/routes/user.routes'

config()
export class Server {
  app: Express
  port: String | undefined
  productRoutes : string
  userRoutes : string
  cartRoutes : string
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.productRoutes = '/product'
    this.userRoutes = '/user'
    this.cartRoutes = '/cart'
    this.middlewares()
    this.routes()
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`)
    })
  }

  middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
  }
  routes(): void {
    this.app.use(this.productRoutes, ProductRoute)
    this.app.use(this.cartRoutes, CartRoute)
    this.app.use(this.userRoutes, UserRoute)
  }
}
