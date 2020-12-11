import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'

import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'

import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'

import { MyDatabase, Collections } from './types'
import entrySchema from './schema/entry.schema'

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin)
}
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(PouchdbAdapterIdb)
addRxPlugin(RxDBReplicationGraphQLPlugin)

const syncURL = 'http://localhost:4000/graphql'

async function _create(): Promise<MyDatabase> {
  console.log('DatabaseService: creating database..')
  const db = await createRxDatabase<Collections>({
    name: 'clientdb',
    adapter: 'idb',
  })

  await db.addCollections({ entries: { schema: entrySchema } })

  return db
}

const DatabaseService = {
  DB_CREATE_PROMISE: _create(),
  get(): Promise<MyDatabase> {
    return this.DB_CREATE_PROMISE
  },
}

export default DatabaseService
