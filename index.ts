import { Server } from './model/server'
import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'

export const prisma = new PrismaClient()

function main() {
  const server = new Server()
  server.listen()

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NICK,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true,
  })
}

main()
