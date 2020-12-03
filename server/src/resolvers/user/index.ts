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
import { MyContext } from '../../types'
import { UserResponse, LoginInput, LoginResponse } from './types'
import { sendEmailVerification } from '../../utils/mail'

@Resolver()
class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: LoginInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (!validateEmail(options.email)) {
      return {
        errors: [{ field: 'email', message: 'ERROR_EMAIL_INVALID' }],
      }
    }
    const emailCode = Math.floor(Math.random() * 899999 + 100000).toString()
    const user = em.create(User, {
      email: options.email,
      password: await argon2.hash(options.password),
      verification: { email: options.email, code: emailCode },
    })

    try {
      await em.persistAndFlush(user)
    } catch (err) {
      if (err.code === 11000) {
        return { errors: [{ field: 'email', message: 'ERROR_EMAIL_EXISTS' }] }
      } else {
        return { errors: [{ field: 'email', message: err.code }] }
      }
    }

    await sendEmailVerification(options.email, emailCode)

    return { user }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('options') options: LoginInput,
    @Ctx() { em, res }: MyContext
  ): Promise<LoginResponse> {
    const user = await em.findOne(User, {
      email: options.email,
    })

    if (!user) {
      return {
        errors: [{ field: 'email', message: 'ERROR_EMAIL_NOT_FOUND' }],
      }
    }

    const valid = await argon2.verify(user.password, options.password)
    if (!valid) {
      return {
        errors: [{ field: 'password', message: 'ERROR_INVALID_PASSWORD' }],
      }
    }

    sendRefreshToken(res, createRefreshToken(user))

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
    @Arg('email') email: string,
    @Arg('code') code: string,
    @Ctx() { em }: MyContext
  ): Promise<LoginResponse> {
    const user = await em.findOne(User, { email: email })

    if (!user) {
      return {
        errors: [{ field: 'email', message: 'ERROR_EMAIL_NOT_FOUND' }],
      }
    }

    if (user.verification.code === code) {
      user.verified = true
      await em.flush()
    } else {
      return {
        errors: [
          { field: 'code', message: 'ERROR_EMAIL_VERIFICATION_INVALID' },
        ],
      }
    }

    return { user, accessToken: createAccessToken(user) }
  }
}

export default UserResolver
