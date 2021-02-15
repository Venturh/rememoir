import { RxJsonSchema, RxCollection, RxDocument, RxDatabase } from 'rxdb'
import { EntryInput } from '../../generated/graphql'

export type EntryDocument = RxDocument<EntryInput>

export type EntryCollection = RxCollection<EntryInput>

export const entrySchema: RxJsonSchema<EntryInput> = {
  title: 'Entry Schema',
  description: 'The Entry',
  version: 0,
  keyCompression: false,
  type: 'object',
  indexes: ['updatedAt', 'title', 'calendarDate'],
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
      default: '',
    },
    url: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    preview: {
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
    createdAt: {
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
    archieved: {
      type: 'boolean',
    },
    pinned: {
      type: 'boolean',
    },
  },
}
