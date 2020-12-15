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
            id,
            text
            url
            type
            updatedAt
            deleted
        }
    }`
  return {
    query,
    variables: {},
  }
}

export const pushQueryBuilder = (entry: EntryDocType) => {
  const query = `

        mutation createEntry($entry: EntryInput!) {
            setEntry(entry: $entry) {
                id,
                updatedAt
            }
        }
    `
  const variables: { entry: EntryDocType } = {
    entry: {
      id: entry.id,
      text: entry.text,
      url: entry.url,
      categories: entry.categories,
      type: entry.type,
      updatedAt: entry.updatedAt,
    },
  }
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
