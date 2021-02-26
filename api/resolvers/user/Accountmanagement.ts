import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import * as argon2 from 'argon2'
import { User } from '../../entities'
import { ErrorMessage, SuccessMessage, MyContext } from '../../types'
import { ValidResponse } from './types'
import { isAuth } from '../../utils/auth'

@Resolver()
export class AccountManagement {
  @Mutation(() => ValidResponse)
  @UseMiddleware(isAuth)
  async changeEmail(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { em, payload }: MyContext
  ) {
    console.log('AccountManagement ~ password', password)
    console.log('AccountManagement ~ email', email)
    const user = await em.findOne(User, { id: payload!.userId })
    if (!user) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    if (!(await argon2.verify(user.password, password)))
      return {
        errors: {
          field: 'password',
          message: ErrorMessage.PASSWORD_INVALID,
        },
      }

    try {
      user.email = email
      user.tokenVersion += 1
      await em.persistAndFlush(user)
      return { message: SuccessMessage.EMAIL_CHANGE_SUCCESS }
    } catch (err) {
      if (err.code === 11000) {
        return {
          errors: { field: 'email', message: ErrorMessage.EMAIL_EXISTS },
        }
      } else {
        return { errors: { field: 'email', message: err.code } }
      }
    }
  }

  @Mutation(() => ValidResponse)
  @UseMiddleware(isAuth)
  async deleteAccount(
    @Arg('password') password: string,
    @Ctx() { em, payload }: MyContext
  ) {
    const user = await em.findOne(User, { id: payload!.userId })
    if (!user) {
      return {
        errors: { field: 'id', message: ErrorMessage.EMAIL_NOT_FOUND },
      }
    }

    if (!(await argon2.verify(user.password, password)))
      return {
        errors: {
          field: 'password',
          message: ErrorMessage.PASSWORD_INVALID,
        },
      }

    try {
      await em.removeAndFlush(user)
      return { message: SuccessMessage.EMAIL_CHANGE_SUCCESS }
    } catch (err) {
      if (err.code === 11000) {
        return {
          errors: { field: 'email', message: ErrorMessage.EMAIL_EXISTS },
        }
      } else {
        return { errors: { field: 'email', message: err.code } }
      }
    }
  }
}
