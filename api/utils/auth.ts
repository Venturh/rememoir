import { sign, verify } from 'jsonwebtoken'
import { Response } from 'express'
import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware'
import { User } from '../entities'
import { MyContext } from '../types'

type JWTToken = {
  userId: string
  iat: number
  exp: number
}

export const validateEmail = (email: string) => {
  const valid = email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
  if (valid) return true
  else return false
}

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  )
}

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
    expires: new Date(Date.now() + 604800000),
  })
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization
  if (!authorization) throw new Error('ERROR_NO_AUTH')

  try {
    const token = authorization?.split(' ')[1]
    const verify = verifyToken(token)

    context.payload = verify
  } catch (error) {
    throw new Error('ERROR_NO_AUTH')
  }
  return next()
}

export function verifyToken(token: string): JWTToken {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET!) as JWTToken
  } catch (error) {
    throw new Error('ERROR_NO_AUTH')
  }
}
