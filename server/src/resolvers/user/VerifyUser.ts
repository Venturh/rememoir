import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entities'
import { MyContext, ErrorMessage } from '../../types'
import { createAccessToken } from '../../utils/auth'
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
}
