import { print } from 'graphql/language/printer'
import {
  ChangedListDocument,
  ListInput,
  RxListReplicationDocument,
  SetListDocument,
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

export const listPushQueryBuilder = (list: ListInput) => {
  console.log('listPushQueryBuilder ~ list', list)
  const variables = {
    list: {
      id: list.id,
      title: list.title,
      description: list.description,
      entries: list.entries,
      hashedKey: list.hashedKey,
      processing: list.processing,
      calendarDate: list.calendarDate,
      categories: list.categories,
      updatedAt: list.updatedAt,
      deleted: list.deleted,
    },
  }

  return {
    query: print(SetListDocument),
    variables,
  }
}

export const listSubscription = print(ChangedListDocument)
