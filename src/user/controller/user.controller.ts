import { Request, Response } from 'express'
import { UserService, UserValidation } from '../service/user.service'

const service = new UserService()
const validate = new UserValidation()

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body
  try {
    if (await validate.existUser(email)) { 
      res.status(400).json({ mesage: 'The user already exists' })
      return
    }
    const user = await service.create(email, password)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Unexpected server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const [existUser, passwordValid] = await Promise.all([
      validate.existUser(email),
      validate.isPasswordValid(email, password),
    ])

    if (!existUser) {
      res.status(404).json({ mesage: 'The user already existsThis user does not exist ' })
      return
    }
    if(!passwordValid){
        res.status(404).json({message:'Incorrect password'})
        return
    }
    const { user, token } = await service.loggUser(email)

    res.status(200).json({
        user,
        token
    })

} catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unexpected server error' })
  }
}
