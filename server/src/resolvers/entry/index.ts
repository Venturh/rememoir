import { wrap } from '@mikro-orm/core'
import { PubSub } from 'apollo-server-express'
import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  UseMiddleware,
  Subscription,
  Root,
} from 'type-graphql'

import { Entry, User } from '../../entities'
import { MyContext } from '../../types'
import { isAuth, verifyToken } from '../../utils/auth'
import { generateLinkPreview } from '../../utils/linkPreview'
import { filterEntry, sortByUpdated } from '../../utils/sort'
import { EntryInput } from './types'

const pubsub = new PubSub()
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
    @Arg('minUpdatedAt') minUpdatedAt: string,
    @Arg('limit') limit: number,

    @Ctx()
    { em, payload }: MyContext
  ) {
    const entries = await em.find(Entry, { user: payload?.userId })
    if (!entries) return

    return filterEntry(
      sortByUpdated(entries) as Entry[],
      parseInt(minUpdatedAt),
      lastId
    ).slice(0, limit)
  }

  @Mutation(() => Entry)
  @UseMiddleware(isAuth)
  async setEntry(
    @Arg('entry') entryInput: EntryInput,
    @Ctx() { em, payload }: MyContext
  ): Promise<Entry> {
    const user = await em.findOne(User, { id: payload?.userId })
    const entry = await em.findOne(Entry, { id: entryInput.id })
    if (entry) {
      let preview = entry.preview
      if (entry.url !== entryInput.url) {
        preview = await generateLinkPreview(entryInput.url)
      }
      wrap(entry).assign({ ...entryInput, preview })

      await em.flush()
      pubsub.publish('changedEntry', entry)
      console.log('UPDATED ENTRY', entry)
      return entry
    } else {
      const doc = new Entry(entryInput, user!)

      if (entryInput.type === 'Link') {
        const linkPreview = await generateLinkPreview(entryInput.url)
        doc.preview = linkPreview
      }
      await em.persistAndFlush(doc)
      pubsub.publish('changedEntry', doc)
      return doc
    }
  }

  @Subscription(() => Entry, {
    subscribe: () => {
      return pubsub.asyncIterator('changedEntry')
    },
  })
  async changedEntry(@Arg('token') token: string, @Root() entry: Entry) {
    verifyToken(token)
    return entry
  }
}

export default EntryResolver
