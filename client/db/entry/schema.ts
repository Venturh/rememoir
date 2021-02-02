import { RxJsonSchema, RxCollection, RxDocument, RxDatabase } from 'rxdb'
import { Entry } from '../../generated/graphql'

export type EntryDocument = RxDocument<Entry>

export type EntryCollection = RxCollection<Entry>

export const entrySchema: RxJsonSchema<Entry> = {
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
    lists: {
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
  },
}
