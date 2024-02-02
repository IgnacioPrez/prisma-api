import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const tokenGenerator = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { id }
    jwt.sign(
      payload,
      process.env.SECRET_KEY as string,
      {
        expiresIn: '20d',
      },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          reject('Error in token creation')
        } else {
          resolve(token as string)
        }
      }
    )
  })
}
