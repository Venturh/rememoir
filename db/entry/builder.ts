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
  const variables: { entry: EntryInput } = {
    entry: {
      id: entry.id,
      type: entry.type,
      url: entry.url,
      title: entry.title,
      description: entry.description,
      hashedKey: entry.hashedKey,
      processing: entry.processing,
      calendarDate: entry.calendarDate,
      categories: entry.categories,
      updatedAt: entry.updatedAt,
      deleted: entry.deleted,
      lists: entry.lists,
    },
  }

  return {
    query: print(CreateEntryDocument),
    variables,
  }
}

export const entrySubscription = print(OnEntryChangedDocument)
