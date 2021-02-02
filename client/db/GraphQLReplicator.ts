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
import { MyDatabase } from './Database'

addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(RxDBReplicationGraphQLPlugin)
addRxPlugin(RxDBQueryBuilderPlugin)

const syncURL = 'http://localhost:4000/graphql'
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

  async restart() {
    if (this.replicationState) {
      this.replicationState.entryReplication.cancel()
      this.replicationState.listReplication.cancel()
    }

    if (this.subscriptionClient) {
      this.subscriptionClient.close()
    }

    this.replicationState = await this.setupGraphQLReplication()
    this.subscriptionClient = this.setupGraphQLSubscription(
      this.replicationState
    )
  }

  async setupGraphQLReplication() {
    const entryReplication = this.db.collections.entries.syncGraphQL({
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
    })

    const listReplication = this.db.collections.lists.syncGraphQL({
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
    })

    listReplication.error$.subscribe(async (err) => {
      console.error('Replication Error on Lists:')
      console.dir(err)
      entryReplication.setHeaders({
        Authorization: 'Bearer ' + (await tryAccessToken()),
      })
    })
    entryReplication.error$.subscribe(async (err) => {
      console.error('Replication Error on Lists:')
      console.dir(err)
      entryReplication.setHeaders({
        Authorization: 'Bearer ' + (await tryAccessToken()),
      })
    })

    await entryReplication.run()
    await listReplication.run()

    return { entryReplication, listReplication }
  }

  setupGraphQLSubscription({ entryReplication, listReplication }) {
    const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
      reconnect: true,
      timeout: 1000 * 60,
      connectionCallback: () => {
        console.log('SubscriptionClient.connectionCallback: connected')
      },
      reconnectionAttempts: 10000,
      inactivityTimeout: 10 * 1000,

      lazy: true,
    })

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
        console.log('subscription emitted => trigger run()')
        console.dir(data)
        await entryReplication.run()
        await listReplication.run()
        console.log('run() done')
      },
      error(error) {
        console.log('run() got error:')
        console.dir(error)
      },
    })

    listRet.subscribe({
      next: async (data) => {
        console.log('subscription emitted => trigger run()')
        console.dir(data)
        await entryReplication.run()
        await listReplication.run()
        console.log('run() done')
      },
      error(error) {
        console.log('run() got error:')
        console.dir(error)
      },
    })

    return wsClient
  }
}
