import { prisma } from '../../..'
import bcryptjs from 'bcryptjs'
import { tokenGenerator } from '../../../helpers/generateToken'

export class UserService {
  async create(email: string, password: string) {
    const salt = bcryptjs.genSaltSync()
    const newPassword = bcryptjs.hashSync(password, salt)

    const user = await prisma.user.create({
      data: {
        email: email,
        password: newPassword,
      },
    })
    return user
  }

  async loggUser(email: string) {
    let token = ''
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    if (user) {
      const data = await tokenGenerator(user.id)
      token = data
    }

    return { token, user }
  }
}

export class UserValidation {
  async existUser(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async isPasswordValid(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    const verifiedPassword = bcryptjs.compareSync(password, user?.password as string)
    return verifiedPassword
  }
}
