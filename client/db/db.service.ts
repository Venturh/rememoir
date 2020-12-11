import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'

import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'

import {
  pullQueryBuilderFromRxSchema,
  pushQueryBuilderFromRxSchema,
  RxDBReplicationGraphQLPlugin,
  syncGraphQL,
} from 'rxdb/plugins/replication-graphql'

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'

import { MyDatabase, Collections } from './types'
import entrySchema from './schema/entry'

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin)
}
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(PouchdbAdapterIdb)
addRxPlugin(RxDBReplicationGraphQLPlugin)

const syncURL = 'http://localhost:4000/graphql'
const batchSize = 5
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

const pullQueryBuilder = pullQueryBuilderFromRxSchema(
  'entry',
  graphQLGenerationInput.entry,
  batchSize
)
const pushQueryBuilder = pushQueryBuilderFromRxSchema(
  'entry',
  graphQLGenerationInput.entry
)

async function _create(): Promise<MyDatabase> {
  console.log('DatabaseService: creating database..')
  const db = await createRxDatabase<Collections>({
    name: 'clientdb',
    adapter: 'idb',
  })

  await db.addCollections({ entries: { schema: entrySchema } })

  const replication = db.collections.entries.syncGraphQL({
    url: syncURL,
    push: {
      batchSize,
      queryBuilder: pushQueryBuilder,
    },
    pull: {
      queryBuilder: pullQueryBuilder,
    },
    live: true,
    liveInterval: 1000 * 60 * 10,
    deletedFlag: 'deleted',
  })
  // await replication.awaitInitialReplication()
  return db
}

const DatabaseService = {
  DB_CREATE_PROMISE: _create(),
  get(): Promise<MyDatabase> {
    return this.DB_CREATE_PROMISE
  },
}

export default DatabaseService
