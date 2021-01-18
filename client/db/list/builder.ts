import { print } from 'graphql/language/printer'
import {
  ListInput,
  RxListReplicationDocument,
  SetListDocument,
  OnEntryChangedDocument,
} from '../../generated/graphql'

export const listPullQueryBuilder = (doc) => {
  if (!doc) {
    doc = {
      id: '',
      updatedAt: '0',
    }
  }
  return {
    query: print(RxListReplicationDocument),
    variables: { lastId: doc.id, minUpdatedAt: doc.updatedAt, limit: 5 },
  }
}

export const listPushQueryBuilder = (entry: ListInput) => {
  const variables = {
    list: {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      entries: entry.entries,
      hashedKey: entry.hashedKey,
      processing: entry.processing,
      calendarDate: entry.calendarDate,
      categories: entry.categories,
      updatedAt: entry.updatedAt,
      deleted: entry.deleted,
    },
  }

  return {
    query: print(SetListDocument),
    variables,
  }
}

export const listSubscription = print(OnEntryChangedDocument)
