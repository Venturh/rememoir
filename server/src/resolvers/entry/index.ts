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
import { ContentType, ContentPreview } from '../../entities/Entry'
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
    //TODO: Maybe nake this
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
    const user = await em.findOne(User, { id: payload?.userId })
    const entries = await em.find(Entry, {})
    let oldEntry = entries!.find((e) => e.id === entryInput!.id)
    if (oldEntry) {
      oldEntry = { ...entryInput, ...oldEntry }
      em.persistAndFlush(oldEntry)
      pubsub.publish('changedEntry', oldEntry)
      return oldEntry
    }
    const doc = new Entry(entryInput, user!)
    if (entryInput.contentType === ContentType.LINK) {
      const linkPreview = await generateLinkPreview(entryInput.contentUrl)
      doc.contentPreview = linkPreview
    }

    em.persistAndFlush(doc)
    pubsub.publish('changedEntry', doc)
    return doc
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

  @Query(() => ContentPreview)
  async test(@Arg('url') url: string) {
    const preview = await generateLinkPreview(url)
    return preview
  }
}

export default EntryResolver