import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  UseMiddleware,
} from 'type-graphql'

import { Entry, User } from '../../entities'
import { MyContext } from '../../types'
import { isAuth } from '../../utils/auth'
import { EntryInput } from './types'

@Resolver()
class EntryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createEntry(
    @Arg('input') input: EntryInput,
    @Ctx() { em, payload }: MyContext
  ) {
    const entry = em.create(Entry, input)

    const user = await em.findOne(User, { id: payload?.userId })
    entry.user = user!

    await em.persistAndFlush(entry)
    return true
  }

  @Query(() => [Entry])
  @UseMiddleware(isAuth)
  async rxEntryReplication(
    @Arg('lastId') lastId: string,
    @Arg('minUpdatedAt') minUpdatedAt: number,
    @Arg('limit') limit: number,

    @Ctx()
    { em, payload }: MyContext
  ) {
    return await em.find(User, { id: payload?.userId })
  }

  @Query(() => [Entry])
  @UseMiddleware(isAuth)
  async allEntriesByUser(
    @Ctx()
    { em, payload }: MyContext
  ) {
    const entries = await em.find(Entry, { user: payload?.userId })
    return entries
  }
}

export default EntryResolver
