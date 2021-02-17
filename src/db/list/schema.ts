import { RxJsonSchema, RxCollection, RxDocument } from 'rxdb'
import { ListInput } from '../../generated/graphql'

export type ListDocument = RxDocument<ListInput>
export type ListCollection = RxCollection<ListInput>

export const listSchema: RxJsonSchema<ListInput> = {
  title: 'List Schema',
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
      default: '',
    },
    description: {
      type: ['string', 'null'],
    },
    categories: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    entries: {
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
    archived: {
      type: 'boolean',
    },
    pinned: {
      type: 'boolean',
    },
  },
}
