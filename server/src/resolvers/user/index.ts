import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  UseMiddleware,
} from 'type-graphql'
import * as argon2 from 'argon2'

import { User } from '../../entities'
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
  isAuth,
  validateEmail,
} from '../../utils/auth'
import { ErrorMessage, MyContext } from '../../types'
import { UserResponse, LoginInput, LoginResponse } from './types'
import { sendEmailVerification } from '../../utils/mail'

@Resolver()
class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: LoginInput,
    @Arg('secret') secret: string,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (!validateEmail(email)) {
      return {
        errors: { field: 'email', message: ErrorMessage.EMAIL_INVALID },
      }
    }
    const emailCode = Math.floor(Math.random() * 899999 + 100000).toString()
    const user = em.create(User, {
      email: email,
      password: await argon2.hash(password),
      verification: { email, code: emailCode },
      secret,
    })

    try {
      await em.persistAndFlush(user)
    } catch (err) {
      if (err.code === 11000) {
        return {
          errors: { field: 'email', message: ErrorMessage.EMAIL_EXISTS },
        }
      } else {
        return { errors: { field: 'email', message: err.code } }
      }
    }

    await sendEmailVerification(email, emailCode)

    return { user }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { em, res }: MyContext
  ): Promise<LoginResponse> {
    const user = await em.findOne(User, {
      email: email,
    })

    if (!user) {
      return {
        errors: { field: 'email', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: { field: 'password', message: ErrorMessage.PASSWORD_INVALID },
      }
    }

    sendRefreshToken(res, createRefreshToken(user))
    if (user.verified === false)
      return {
        errors: { field: 'verified', message: ErrorMessage.USER_NOT_VERIIFIED },
        user,
      }

    return { user, accessToken: createAccessToken(user) }
  }

  @Query(() => [User])
  async users(@Ctx() { em }: MyContext) {
    return await em.find(User, {})
  }

  @Mutation(() => Boolean)
  async revokeRefreshToken(
    @Arg('userId') userId: string,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.findOne(User, { id: userId })
    user!.tokenVersion += 1
    await em.flush()
    return true
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  logout(@Ctx() { payload }: MyContext) {
    return `Bye ${payload?.userId}`
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload, em }: MyContext) {
    const user = await em.findOne(User, { id: payload?.userId })

    return user
  }

  @Mutation(() => LoginResponse)
  async verifyEmailCode(
    @Arg('id') id: string,
    @Arg('code') code: string,
    @Ctx() { em }: MyContext
  ): Promise<LoginResponse> {
    const user = await em.findOne(User, { id: id })

    if (!user) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    if (user.verification.code === code) {
      user.verified = true
      await em.flush()
    } else {
      return {
        errors: { field: 'code', message: ErrorMessage.VERIFICATION_INVALID },
      }
    }

    return { user, accessToken: createAccessToken(user) }
  }
}

export default UserResolver
