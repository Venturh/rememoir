import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import * as argon2 from 'argon2'
import { User } from '../../entities'
import { MyContext, ErrorMessage } from '../../types'
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from '../../utils/auth'
import { LoginResponse, LoginInput } from './types'

@Resolver()
export class LoginResolver {
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
}
