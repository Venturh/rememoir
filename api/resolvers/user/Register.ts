import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import * as argon2 from 'argon2'
import { User } from '../../entities'
import { MyContext, ErrorMessage } from '../../types'
import { validateEmail } from '../../utils/auth'
import { sendEmailVerification } from '../../utils/mail'
import { UserResponse, LoginInput } from './types'

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('username') username: string,
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
      email,
      password: await argon2.hash(password),
      username,
      secret,
      verification: { email, code: emailCode },
      billingDetails: {},
    })

    try {
      await em.persistAndFlush(user)
    } catch (err) {
      if (err.code === 11000) {
        console.log('UserResolver ~ err', err)
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
}
