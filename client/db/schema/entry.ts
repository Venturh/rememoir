import { RxJsonSchema } from 'rxdb'
import { RxEntryDocumentType } from '../types'

const entrySchema: RxJsonSchema<RxEntryDocumentType> = {
  title: 'Entry Schema',
  description: 'The Entry',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
      default: '',
    },
    text: {
      type: 'string',
      default: '',
    },
    url: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    categories: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}

export default entrySchema
