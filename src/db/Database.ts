import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb'

import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate'

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { EntryCollection, entrySchema } from './entry/schema'
import { ListCollection, listSchema } from './list/schema'
import { GraphQLReplicator } from './GraphQLReplicator'

addRxPlugin(RxDBNoValidatePlugin)

addRxPlugin(PouchdbAdapterIdb)

export interface Collections {
  entries: EntryCollection
  lists: ListCollection
}
type MyDatabase = RxDatabase<Collections>

let database: MyDatabase
export function getDb() {
  return database
}
export async function createDb(): Promise<MyDatabase> {
  const db = await createRxDatabase<Collections>({
    name: 'clientdb',
    adapter: 'idb',
  })

  await db.addCollections({
    entries: {
      schema: entrySchema,
      // migrationStrategies: {
      //   // eslint-disable-next-line object-shorthand
      //   1: function (oldDoc: EntryInput) {
      //     return oldDoc
      //   },
      // },
    },
    lists: {
      schema: listSchema,
      // migrationStrategies: {
      //   // eslint-disable-next-line object-shorthand
      //   1: function (oldDoc: ListInput) {
      //     return oldDoc
      //   },
      // },
    },
  })

  const repl = new GraphQLReplicator(db)
  await repl.setupGraphQLReplication()
  database = db
  return db
}
