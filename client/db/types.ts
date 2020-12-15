import { RxCollection, RxDocument, RxDatabase } from 'rxdb'
import { EntryInput } from '../generated/graphql'

// export type EntryDocType = {
//   id: string
//   contentText: string
//   contentUrl: string
//   contentType: string
//   categories: Array<string>
//   calendarDate: string
//   hashedKey: string
//   processing: boolean

//   updatedAt: string
// }

type EntryDocMethods = {
  getText: (id: string) => string
}

export type EntryDocument = RxDocument<EntryInput, EntryDocMethods>

type EntryCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

export type EntryCollection = RxCollection<
  EntryInput,
  EntryDocMethods,
  EntryCollectionMethods
>

export interface Collections {
  entries: EntryCollection
}
export type MyDatabase = RxDatabase<Collections>
