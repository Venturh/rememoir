import { EntryInput } from '../generated/graphql'
import { EntryDocType } from './types'

export const pullQueryBuilder = (doc) => {
  if (!doc) {
    // the first pull does not have a start-document
    doc = {
      id: '',
      updatedAt: 0,
    }
  }
  const query = `{
        rxEntryReplication(lastId: "${doc.id}", minUpdatedAt: ${doc.updatedAt}, limit: 5) {
            _id
            id,
            contentText
            contentUrl
            contentType
            calendarDate
            processing
            updatedAt
            hashedKey
            deleted
        }
    }`
  return {
    query,
    variables: {},
  }
}

export const pushQueryBuilder = (entry: EntryInput) => {
  const query = `

        mutation createEntry($entry: EntryInput!) {
            setEntry(entry: $entry) {
                id,
                updatedAt
            }
        }
    `
  const variables: { entry: EntryInput } = {
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
    },
  }
  console.log(variables.entry, entry)

  return {
    query,
    variables,
  }
}

export const wsQuery = `subscription onEntryChanged($token: String!) {
    changedEntry(token: $token){
      id
    }
}`
