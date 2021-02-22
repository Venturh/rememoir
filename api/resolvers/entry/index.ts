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
    console.log('EntryResolver ~ entryInput', entryInput)
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
          doc.categories = doc.categories.concat(keywords)
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

  @Query(() => Entry)
  async getSharedEntry(
    @Arg('id') id: string,
    @Ctx()
    { em }: MyContext
  ) {
    const entry = await em.findOne(Entry, { id: id })
    return entry
  }
}

export default EntryResolver
