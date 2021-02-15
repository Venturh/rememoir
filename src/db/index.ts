import { RxDatabase } from 'rxdb'
import { Collections } from './Database'
export { createDb } from './Database'

export { GraphQLReplicator } from './GraphQLReplicator'
export type MyDatabase = RxDatabase<Collections>
