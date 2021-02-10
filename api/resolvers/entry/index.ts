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
import { generateLinkPreview, LinkPreview } from '../../utils/linkPreview'
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
      let existingPreview = entry.preview
      if (entry.url !== entryInput.url) {
        const { preview } = await generateLinkPreview(
          entryInput.url,
          entryInput.categories
        )
        existingPreview = preview
      }

      wrap(entry).assign({ ...entryInput, preview: existingPreview })
      await em.flush()
      pubsub.publish('changedEntry', entry)
      return entry
    } else {
      const doc = new Entry(entryInput, user!)

      if (entryInput.type === 'Link') {
        const { preview, type, keywords } = await generateLinkPreview(
          entryInput.url,
          entryInput.categories
        )
        if (type) doc.preview = { type }
        else doc.preview = preview
        if (keywords) {
          console.log('keywords', keywords)
          console.log('doc', doc.categories)
          const test = doc.categories.concat(keywords)
          console.log('EntryResolver ~ test', test)
          doc.categories = test
        }
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
  changedEntry(@Arg('token') token: string, @Root() entry: Entry) {
    verifyToken(token)
    return entry
  }

  @Query(() => Boolean)
  async preview(
    @Arg('url')
    url: string
  ) {
    await generateLinkPreview(url)
    return true
  }
}

export default EntryResolver
