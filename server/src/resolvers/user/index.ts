import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  UseMiddleware,
} from 'type-graphql'

import { User } from '../../entities'
import { isAuth } from '../../utils/auth'
import { MyContext } from '../../types'

@Resolver()
class UserResolver {
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
}

export default UserResolver
