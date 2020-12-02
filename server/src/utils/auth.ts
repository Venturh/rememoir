import { User } from '../entities/User'
import { sign, verify } from 'jsonwebtoken'
import { Response } from 'express'
import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware'
import { MyContext } from '../types'

export const validateEmail = (email: string) => {
  const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return email.match(emailValidation)
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

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']
  if (!authorization) throw new Error('ERROR_NO_AUTH')

  try {
    const token = authorization?.split(' ')[1]
    context.payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as any
  } catch (error) {
    throw new Error('ERROR_NO_AUTH')
  }
  return next()
}

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  })
}
