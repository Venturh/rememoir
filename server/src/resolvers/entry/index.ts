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
    @Arg('input') { text, url, type, categories }: EntryInput,
    @Ctx() { em, payload }: MyContext
  ) {
    const user = await em.findOne(User, { id: payload?.userId })
    const entry = new Entry(text, url, type, categories, user!)
    await em.persistAndFlush(entry)
    return true
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

  @Query(() => [Entry])
  @UseMiddleware(isAuth)
  async rxEntryReplication(
    @Arg('lastId') lastId: string,
    @Arg('minUpdatedAt') minUpdatedAt: number,
    @Arg('limit') limit: number,

    @Ctx()
    { em, payload }: MyContext
  ) {
    const entries = await em.find(Entry, { user: payload?.userId })
    if (!entries) return

    const sorted = entries!.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return 1
      if (a.updatedAt < b.updatedAt) return -1
      if (a.updatedAt === b.updatedAt) {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        else return 0
      } else return 0
    })

    const filterForMinUpdatedAtAndId = sorted.filter((doc) => {
      if (doc.updatedAt < minUpdatedAt) return false
      if (doc.updatedAt > minUpdatedAt) return true
      if (doc.updatedAt === minUpdatedAt) {
        if (doc.id > lastId) return true
        else return false
      } else return false
    })

    return filterForMinUpdatedAtAndId.slice(0, limit)
  }

  @Mutation(() => Entry)
  async setEntry(
    @Arg('entry') id: string,
    @Ctx() { em }: MyContext
  ): Promise<Entry> {
    const entries = await em.find(Entry, {})
    const entry = await em.findOne(Entry, { id })
    entries!.filter((e) => e.id !== entry!.id)
    entry!.updatedAt = Math.round(new Date().getTime() / 1000)
    em.persistAndFlush(entry!)
    return entry!
  }
}

export default EntryResolver
