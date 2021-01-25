import { RxJsonSchema, RxCollection, RxDocument, RxDatabase } from 'rxdb'
import { EntryInput } from '../../generated/graphql'

export type EntryDocMethods = {
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

export const entrySchema: RxJsonSchema<EntryInput> = {
  title: 'Entry Schema',
  description: 'The Entry',
  version: 0,
  keyCompression: false,
  type: 'object',
  indexes: ['updatedAt'],
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    title: {
      type: 'string',
    },
    contentDescription: {
      type: 'string',
      default: '',
    },
    contentUrl: {
      type: 'string',
    },
    contentType: {
      type: 'string',
    },
    contentPreview: {
      type: ['object', 'null'],
    },
    categories: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    updatedAt: {
      type: 'string',
    },
    calendarDate: {
      type: 'string',
    },
    processing: {
      type: 'boolean',
    },
    hashedKey: {
      type: 'string',
    },
  },
}
