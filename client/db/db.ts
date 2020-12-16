import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'

import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'

import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { getAccessToken, tryAccessToken } from '../utils/auth'
import { MyDatabase, Collections } from './types'
import entrySchema from './schema/entry'

import {
  pullQueryBuilder,
  pushQueryBuilder,
  entrySubscription,
} from './builders'

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin)
}
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(PouchdbAdapterIdb)
addRxPlugin(RxDBReplicationGraphQLPlugin)

const syncURL = 'http://localhost:4000/graphql'
export const graphQLGenerationInput = {
  entry: {
    schema: entrySchema,
    feedKeys: ['id', 'updatedAt'],
    deletedFlag: 'deleted',
    subscriptionParams: {
      token: 'String!',
    },
  },
}

async function _create(): Promise<MyDatabase> {
  const db = await createRxDatabase<Collections>({
    name: 'clientdb',
    adapter: 'idb',
    multiInstance: true,
  })

  await db.addCollections({ entries: { schema: entrySchema } })

  db.waitForLeadership().then(function () {
    document.title = '♛ ' + document.title
  })

  const replication = db.collections.entries.syncGraphQL({
    url: syncURL,
    headers: {
      Authorization: 'Bearer ' + getAccessToken(),
    },
    pull: {
      queryBuilder: pullQueryBuilder,
    },
    push: {
      queryBuilder: pushQueryBuilder,
      batchSize: 5,
      modifier: (d) => d,
    },
    deletedFlag: 'deleted',
    live: true,
    liveInterval: 1000 * 60 * 10,
  })

  replication.error$.subscribe(async (err) => {
    console.error('replication error:')
    console.dir(err)
    // TODO: Neu Validieren wenn abgelaufen
    replication.setHeaders({
      Authorization: 'Bearer ' + (await tryAccessToken()),
    })
  })

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

  const ret = wsClient.request({
    query: entrySubscription,
    variables: {
      token: getAccessToken(),
    },
  })

  ret.subscribe({
    next: async (data) => {
      console.log('subscription emitted => trigger run()')
      console.dir(data)
      await replication.run()
      console.log('run() done')
    },
    error(error) {
      console.log('run() got error:')
      console.dir(error)
    },
  })

  if (!db.isLeader()) {
    console.log('not leader')

    replication.run()
  }
  await replication.awaitInitialReplication()

  return db
}

const DatabaseService = {
  DB_CREATE_PROMISE: _create(),
  get(): Promise<MyDatabase> {
    return this.DB_CREATE_PROMISE
  },
}

export default DatabaseService