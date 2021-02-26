import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../../entities'
import { MyContext, ErrorMessage } from '../../types'
import { createAccessToken, isAuth } from '../../utils/auth'
import { LoginResponse, ValidResponse } from './types'

@Resolver()
export class VerifyUser {
  @Mutation(() => LoginResponse)
  async verifyEmailCode(
    @Arg('id') id: string,
    @Arg('code') code: string,
    @Ctx() { em }: MyContext
  ): Promise<LoginResponse> {
    const user = await em.findOne(User, { id })

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

  @Mutation(() => ValidResponse)
  @UseMiddleware(isAuth)
  async verifySecretKey(
    @Arg('key') key: string,
    @Ctx() { em, payload }: MyContext
  ) {
    const user = await em.findOne(User, { id: payload?.userId })
    const verify = key === user!.secret
    if (verify) {
      return { message: '' }
    } else {
      return {
        errors: { field: 'verify', message: ErrorMessage.CODE_INVALID },
      }
    }
  }
}
