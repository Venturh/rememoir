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
    @Arg('minUpdatedAt') minUpdatedAtString: string,
    @Arg('limit') limit: number,

    @Ctx()
    { em, payload }: MyContext
  ) {
    const minUpdatedAt = parseInt(minUpdatedAtString)
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
    @Arg('entry') entryInput: EntryInput,
    @Ctx() { em, payload }: MyContext
  ): Promise<Entry> {
    console.log('EntryResolver ~ entryInput', entryInput)
    const user = await em.findOne(User, { id: payload?.userId })
    const entry = await em.findOne(Entry, { id: entryInput.id })
    if (entry) {
      let preview = entry.preview
      if (entry.url !== entryInput.url) {
        preview = await generateLinkPreview(entryInput.url)
      }
      wrap(entry).assign({ ...entryInput, contentPreview: preview })
      await em.flush()
      pubsub.publish('changedEntry', entry)
      return entry
    } else {
      const doc = new Entry(entryInput, user!)
      if (entryInput.type === 'Link') {
        const linkPreview = await generateLinkPreview(entryInput.url)
        doc.preview = linkPreview
      }
      em.persistAndFlush(doc)
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

  @Query(() => Boolean)
  async preview(
    @Arg('url')
    url: string
  ) {
    const preview = await generateLinkPreview(url)
    console.log('EntryResolver ~ preview', preview)
    return true
  }
}

export default EntryResolver
