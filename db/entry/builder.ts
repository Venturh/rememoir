import { print } from 'graphql/language/printer'
import {
  EntryInput,
  RxEntryReplicationDocument,
  CreateEntryDocument,
  OnEntryChangedDocument,
} from '../../generated/graphql'

export const entryPullQueryBuilder = (doc) => {
  if (!doc) {
    doc = {
      id: '',
      updatedAt: '0',
    }
  }
  return {
    query: print(RxEntryReplicationDocument),
    variables: { lastId: doc.id, minUpdatedAt: doc.updatedAt, limit: 5 },
  }
}

export const entryPushQueryBuilder = (entry: EntryInput) => {
  console.log('entryPushQueryBuilder ~ entry', entry)
  const variables: { entry: EntryInput } = {
    entry: {
      ...entry,
    },
  }

  return {
    query: print(CreateEntryDocument),
    variables,
  }
}

export const entrySubscription = print(OnEntryChangedDocument)
