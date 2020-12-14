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
  @UseMiddleware(isAuth)
  async setEntry(
    @Arg('entry') entry: EntryInput,
    @Ctx() { em, payload }: MyContext
  ): Promise<Entry> {
    console.log('🚀 ~ file: index.ts ~ line 68 ~ EntryResolver ~ entry', entry)
    const user = await em.findOne(User, { id: payload?.userId })
    const entries = await em.find(Entry, {})
    let oldEntry = entries!.find((e) => e.id === entry!.id)
    if (oldEntry) {
      oldEntry = { ...entry, ...oldEntry }
      em.persistAndFlush(oldEntry)
      return oldEntry
    }
    const doc = new Entry(
      entry.id,
      entry.text,
      entry.url,
      entry.type,
      entry.categories,
      user!
    )
    em.persistAndFlush(doc)
    return doc
  }
}

export default EntryResolver
