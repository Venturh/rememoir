import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  UseMiddleware,
} from 'type-graphql'
import { decode, sign, verify } from 'jsonwebtoken'
import * as argon2 from 'argon2'
import { User } from '../../entities'
import { ErrorMessage, SuccessMessage, MyContext } from '../../types'
import { sendPasswordReset } from '../../utils/mail'
import { ValidResponse } from './types'
import { isAuth } from '../../utils/auth'

@Resolver()
export class PasswordManagement {
  @Mutation(() => ValidResponse)
  async requestResetPassword(
    @Arg('email') email: string,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.findOne(User, { email })
    if (!user) {
      return {
        errors: { field: 'email', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    const token = sign(
      {
        id: user.id,
      },
      user.password,
      {
        expiresIn: '1d',
      }
    )

    const url = `${process.env.VITE_CLIENT_URL}/auth/resetPassword?token=${token}`
    sendPasswordReset(email, url)
    return { message: SuccessMessage.RESET_PASSWORD_STARTED }
  }

  @Mutation(() => ValidResponse)
  async verifyPasswordReset(
    @Arg('token') token: string,
    @Ctx() { em }: MyContext
  ) {
    const { id } = decode(token) as { id: string }

    if (!id) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    const user = await em.findOne(User, { id })
    if (!user) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    try {
      verify(token, user.password)
      user.tokenVersion += 1
      await em.flush()
      return { message: SuccessMessage.RESET_PASSWORD_COMPLETE }
    } catch (error) {
      return {
        errors: {
          field: 'token',
          message: ErrorMessage.VERIFICATION_INVALID,
        },
      }
    }
  }

  @Mutation(() => ValidResponse)
  async resetPasswort(
    @Arg('token') token: string,
    @Arg('password') password: string,
    @Ctx() { em }: MyContext
  ) {
    const { id } = decode(token) as { id: string }
    if (!id) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    const user = await em.findOne(User, { id })
    if (!user) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    try {
      verify(token, user.password)
      user.password = await argon2.hash(password)
      await em.persistAndFlush(user)
      return { message: SuccessMessage.PW_CHANGE_SUCCESS }
    } catch (err) {
      return {
        errors: { field: 'token', message: ErrorMessage.VERIFICATION_INVALID },
      }
    }
  }

  @Mutation(() => ValidResponse)
  @UseMiddleware(isAuth)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { em, payload }: MyContext
  ) {
    const user = await em.findOne(User, { id: payload!.userId })
    if (!user) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    try {
      if (!(await argon2.verify(user.password, oldPassword)))
        return {
          errors: {
            field: 'password',
            message: ErrorMessage.PASSWORD_INVALID,
          },
        }

      user.password = await argon2.hash(newPassword)
      user.tokenVersion += 1
      await em.persistAndFlush(user)
      return { message: SuccessMessage.PW_CHANGE_SUCCESS }
    } catch (err) {
      return {
        errors: { field: 'token', message: ErrorMessage.VERIFICATION_INVALID },
      }
    }
  }
}
