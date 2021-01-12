import { print } from 'graphql/language/printer'
import {
  EntryInput,
  RxEntryReplicationDocument,
  CreateEntryDocument,
  OnEntryChangedDocument,
} from '../generated/graphql'

export const pullQueryBuilder = (doc) => {
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

export const pushQueryBuilder = (entry: EntryInput) => {
  const variables = {
    entry: {
      id: entry.id,
      contentType: entry.contentType,
      contentUrl: entry.contentUrl,
      contentText: entry.contentText,
      hashedKey: entry.hashedKey,
      processing: entry.processing,
      calendarDate: entry.calendarDate,
      categories: entry.categories,
      updatedAt: entry.updatedAt,
      deleted: entry.deleted,
    },
  }

  return {
    query: print(CreateEntryDocument),
    variables,
  }
}

export const entrySubscription = print(OnEntryChangedDocument)
