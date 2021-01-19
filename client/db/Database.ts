import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { EntryCollection, entrySchema } from './entry/schema'
import { ListCollection, listSchema } from './list/schema'
import { GraphQLReplicator } from './GraphQLReplicator'

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin)
}
addRxPlugin(RxDBValidatePlugin)

addRxPlugin(PouchdbAdapterIdb)

export interface Collections {
  entries: EntryCollection
  lists: ListCollection
}
export type MyDatabase = RxDatabase<Collections>

export async function createDb(): Promise<MyDatabase> {
  const db = await createRxDatabase<Collections>({
    name: 'clientdb',
    adapter: 'idb',
    multiInstance: true,
  })

  await db.addCollections({
    entries: { schema: entrySchema },
    lists: { schema: listSchema },
  })

  const repl = new GraphQLReplicator(db)
  await repl.setupGraphQLReplication()

  return db
}
