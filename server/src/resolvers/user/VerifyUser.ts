import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../../entities'
import { MyContext, ErrorMessage } from '../../types'
import { createAccessToken, isAuth } from '../../utils/auth'
import { LoginResponse } from './types'

@Resolver()
export class VerifyUser {
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async verifySecretKey(
    @Arg('key') key: string,
    @Ctx() { em, payload }: MyContext
  ): Promise<boolean> {
    const user = await em.findOne(User, { id: payload?.userId })
    const verify = key === user!.secret
    if (verify) {
      return true
    } else {
      return false
    }
  }
}
