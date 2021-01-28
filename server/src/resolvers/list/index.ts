import { wrap } from '@mikro-orm/core'
import { PubSub } from 'apollo-server-express'
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  UseMiddleware,
  Mutation,
} from 'type-graphql'

import { Entry, List, User } from '../../entities'

import { MyContext } from '../../types'
import { isAuth } from '../../utils/auth'
import { ListInput } from './types'

const pubsub = new PubSub()
@Resolver()
class ListResolver {
  @Query(() => [List])
  @UseMiddleware(isAuth)
  async rxListReplication(
    @Arg('lastId') lastId: string,
    @Arg('minUpdatedAt') minUpdatedAtString: string,
    @Arg('limit') limit: number,

    @Ctx()
    { em, payload }: MyContext
  ) {
    const minUpdatedAt = parseInt(minUpdatedAtString)
    const lists = await em.find(List, { user: payload?.userId })
    if (!lists) return

    const sorted = lists!.sort((a, b) => {
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

  @Mutation(() => List)
  @UseMiddleware(isAuth)
  async setList(
    @Arg('list') listInput: ListInput,
    @Ctx() { em, payload }: MyContext
  ): Promise<List> {
    const user = await em.findOne(User, { id: payload?.userId })
    const list = await em.findOne(List, { id: listInput.id })
    if (list) {
      const ids = listInput.entries.map((e) => e.id)
      const entries = await em.find(Entry, { id: { $in: ids } })
      wrap(list).assign({ ...listInput, entries })
      await em.flush()
      pubsub.publish('changedList', list)
      return list
    } else {
      const ids = listInput.entries.map((e) => e.id)
      const entries = await em.find(Entry, { id: { $in: ids } })
      const doc = new List(listInput, user!)
      doc.entries.loadItems()
      doc.entries.add(...entries)

      em.persistAndFlush(doc)
      pubsub.publish('changedlist', doc)
      return doc
    }
  }
}

export default ListResolver
