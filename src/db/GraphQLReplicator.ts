import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'
import {
  RxDBReplicationGraphQLPlugin,
  RxGraphQLReplicationState,
} from 'rxdb/plugins/replication-graphql'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { addRxPlugin } from 'rxdb'

import { EntryInput, ListInput } from '../generated/graphql'
import { getAccessToken, tryAccessToken } from '../utils/auth'
import {
  decryptEntry,
  decryptList,
  encryptEntry,
  encryptList,
} from '../utils/crypto'
import {
  listPullQueryBuilder,
  listPushQueryBuilder,
  listSubscription,
} from './list/builder'
import {
  entryPullQueryBuilder,
  entryPushQueryBuilder,
  entrySubscription,
} from './entry/builder'
import { MyDatabase } from '.'

addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(RxDBReplicationGraphQLPlugin)
addRxPlugin(RxDBQueryBuilderPlugin)

const syncURL = import.meta.env.VITE_API_GRAPHQL as string
const batchSize = 5

export class GraphQLReplicator {
  db: MyDatabase
  replicationState: {
    entryReplication: RxGraphQLReplicationState
    listReplication: RxGraphQLReplicationState
  }

  subscriptionClient: any

  constructor(db: MyDatabase) {
    this.db = db
    this.replicationState = { entryReplication: null, listReplication: null }
    this.subscriptionClient = null
  }

  async refreshTokens() {
    const accessToken = await tryAccessToken(true)
    this.replicationState.entryReplication.setHeaders({
      Authorization: `Bearer ${accessToken}`,
    })
    this.replicationState.listReplication.setHeaders({
      Authorization: `Bearer ${accessToken}`,
    })
  }

  async setupGraphQLReplication() {
    this.replicationState.entryReplication = this.db.collections.entries.syncGraphQL(
      {
        url: syncURL,
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
        pull: {
          queryBuilder: entryPullQueryBuilder,
          modifier: (d: EntryInput) => {
            return decryptEntry(d)
          },
        },
        push: {
          queryBuilder: entryPushQueryBuilder,
          batchSize,
          modifier: (d: EntryInput) => {
            return encryptEntry(d)
          },
        },
        deletedFlag: 'deleted',
        live: true,
        liveInterval: 1000 * 60 * 10,
      }
    )

    this.replicationState.listReplication = this.db.collections.lists.syncGraphQL(
      {
        url: syncURL,
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
        pull: {
          queryBuilder: listPullQueryBuilder,
          modifier: (list: ListInput) => {
            return decryptList(list)
          },
        },
        push: {
          queryBuilder: listPushQueryBuilder,
          batchSize,
          modifier: (list: ListInput) => {
            return encryptList(list)
          },
        },
        deletedFlag: 'deleted',
        live: true,
        liveInterval: 1000 * 60 * 10,
      }
    )

    this.replicationState.listReplication.error$.subscribe(async (err) => {
      console.error('Replication Error on Lists:')
      console.dir(err)
      await this.refreshTokens()
    })
    this.replicationState.entryReplication.error$.subscribe(async (err) => {
      console.error('Replication Error on Entry:')
      console.dir(err)
      await this.refreshTokens()
    })

    await this.replicationState.entryReplication.run()
    await this.replicationState.listReplication.run()

    return {
      entryReplication: this.replicationState.entryReplication,
      listReplication: this.replicationState.listReplication,
    }
  }

  setupGraphQLSubscription({ entryReplication, listReplication }) {
    const wsClient = new SubscriptionClient(
      `ws://${import.meta.env.VITE_API_WS as string}/graphql`,
      {
        reconnect: true,
        timeout: 1000 * 60,
        reconnectionAttempts: 10000,
        inactivityTimeout: 10 * 1000,

        lazy: true,
      }
    )

    const entryRet = wsClient.request({
      query: entrySubscription,
      variables: {
        token: getAccessToken(),
      },
    })
    const listRet = wsClient.request({
      query: listSubscription,
      variables: {
        token: getAccessToken(),
      },
    })

    entryRet.subscribe({
      next: async (data) => {
        await entryReplication.run()
        await listReplication.run()
      },
      error(error) {
        console.err(error)
      },
    })

    listRet.subscribe({
      next: async (data) => {
        await entryReplication.run()
        await listReplication.run()
      },
      error(error) {
        console.err(error)
      },
    })

    return wsClient
  }
}
