import { RxCollection, RxDocument, RxDatabase } from 'rxdb'

export type EntryDocType = {
  id: string
  contentText: string
  contentUrl: string
  contentType: string
  categories: Array<string>
  calendarDate: string
  hashedKey: string
  processing: boolean

  updatedAt: string
}

type EntryDocMethods = {
  getText: (id: string) => string
}

export type EntryDocument = RxDocument<EntryDocType, EntryDocMethods>

type EntryCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

export type EntryCollection = RxCollection<
  EntryDocType,
  EntryDocMethods,
  EntryCollectionMethods
>

export interface Collections {
  entries: EntryCollection
}
export type MyDatabase = RxDatabase<Collections>
