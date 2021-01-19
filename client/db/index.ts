import {
  createRxDatabase,
  addRxPlugin,
  RxDatabase,
  addRxPlugin,
} from 'rxdb/plugins/core'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'

import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'

import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { getAccessToken, tryAccessToken } from '../utils/auth'
import { decryptEntry, encryptEntry } from '../utils/crypto'
import { EntryInput, ListInput } from '../generated/graphql'
import { EntryCollection, entrySchema } from './entry/schema'
import { ListCollection, listSchema } from './list/schema'

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

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin)
}
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(PouchdbAdapterIdb)
addRxPlugin(RxDBReplicationGraphQLPlugin)
addRxPlugin(RxDBQueryBuilderPlugin)

export interface Collections {
  entries: EntryCollection
  lists: ListCollection
}
export type MyDatabase = RxDatabase<Collections>

const syncURL = 'http://localhost:4000/graphql'

export async function createDb(): Promise<MyDatabase> {
  const db = await createRxDatabase<Collections>({
    name: 'clientdb',
    adapter: 'idb',
    multiInstance: true,
  })

  const colle = await db.addCollections({
    entries: { schema: entrySchema },
    lists: { schema: listSchema },
  })
  console.log('createDb ~ colle', colle)

  db.waitForLeadership().then(function () {
    document.title = '♛ ' + document.title
  })

  const entryReplication = db.collections.entries.syncGraphQL({
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
      batchSize: 5,
      modifier: (d: EntryInput) => {
        console.log('createDb ~ d', d)
        return encryptEntry(d)
      },
    },
    deletedFlag: 'deleted',
    live: true,
    liveInterval: 1000 * 60 * 10,
  })

  const listReplication = db.collections.lists.syncGraphQL({
    url: syncURL,
    headers: {
      Authorization: 'Bearer ' + getAccessToken(),
    },
    pull: {
      queryBuilder: listPullQueryBuilder,
      modifier: (d: ListInput) => {
        return d
      },
    },
    push: {
      queryBuilder: listPushQueryBuilder,
      batchSize: 5,
      modifier: (d: ListInput) => {
        console.log('createDb ~ d', d)
        return d
      },
    },
    deletedFlag: 'deleted',
    live: true,
    liveInterval: 1000 * 60 * 10,
  })

  entryReplication.error$.subscribe(async (err) => {
    console.error('replication error:')
    console.dir(err)
    // TODO: Neu Validieren wenn abgelaufen
    entryReplication.setHeaders({
      Authorization: 'Bearer ' + (await tryAccessToken()),
    })
  })
  listReplication.error$.subscribe(async (err) => {
    console.error('replication error:')
    console.dir(err)
    // TODO: Neu Validieren wenn abgelaufen
    entryReplication.setHeaders({
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
      await entryReplication.run()
      console.log('run() done')
    },
    error(error) {
      console.log('run() got error:')
      console.dir(error)
    },
  })

  if (!db.isLeader()) {
    console.log('not leader')

    entryReplication.run()
  }
  await entryReplication.awaitInitialReplication()
  await listReplication.awaitInitialReplication()

  return db
}
