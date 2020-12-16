import { RxJsonSchema } from 'rxdb'
import { EntryInput } from '../../generated/graphql'

const entrySchema: RxJsonSchema<EntryInput> = {
  title: 'Entry Schema',
  description: 'The Entry',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    contentText: {
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
      type: 'object',
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

export default entrySchema