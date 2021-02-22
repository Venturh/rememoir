import { wrap } from '@mikro-orm/core'
import { PubSub } from 'apollo-server-express'
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  UseMiddleware,
  Mutation,
  Subscription,
  Root,
} from 'type-graphql'

import { Entry, List, User } from '../../entities'

import { MyContext } from '../../types'
import { isAuth, verifyToken } from '../../utils/auth'
import { filterList, sortByUpdated } from '../../utils/sort'
import { ListInput, SharedList } from './types'

const pubsub = new PubSub()
@Resolver()
class ListResolver {
  @Query(() => [List])
  @UseMiddleware(isAuth)
  async rxListReplication(
    @Arg('lastId') lastId: string,
    @Arg('minUpdatedAt') minUpdatedAt: string,
    @Arg('limit') limit: number,

    @Ctx()
    { em, payload }: MyContext
  ) {
    const lists = await em.find(List, { user: payload?.userId })
    if (!lists) return

    return filterList(
      sortByUpdated(lists) as List[],
      parseInt(minUpdatedAt),
      lastId
    ).slice(0, limit)
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
      wrap(list).assign({ ...listInput })
      await em.flush()
      pubsub.publish('changedList', list)
      return list
    } else {
      const doc = new List(listInput, user!)
      doc.entries = listInput.entries

      em.persistAndFlush(doc)
      pubsub.publish('changedlist', doc)
      return doc
    }
  }

  @Subscription(() => List, {
    subscribe: () => {
      return pubsub.asyncIterator('changedList')
    },
  })
  changedList(@Arg('token') token: string, @Root() list: List) {
    verifyToken(token)
    return list
  }

  @Query(() => SharedList)
  async getSharedList(
    @Arg('id') id: string,
    @Ctx()
    { em }: MyContext
  ) {
    const list = await em.findOne(List, { id })
    const entries = await em.find(Entry, {
      id: { $in: list?.entries },
      deleted: false,
    })
    return { list, entries }
  }
}

export default ListResolver
