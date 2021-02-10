import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { addRxPlugin } from 'rxdb'

import dayjs from 'dayjs'
import ObjectID from 'bson-objectid'
import { EntryInput } from '../../generated/graphql'
import { EditedEntry } from '../../types'
import { MyDatabase } from '../index'
import { removeEntryFromList } from '../list'

addRxPlugin(RxDBUpdatePlugin)

type NewEntry = {
  title: string
  description: string
  categories: string[]
  type: string
  url: string
}

export async function addEntry(
  { title, description, type, url, categories }: NewEntry,
  db: MyDatabase
) {
  const entry: EntryInput = {
    id: new ObjectID().str,
    title,
    description,
    type,
    url,
    categories,
    hashedKey: 'hashed',
    calendarDate: dayjs().format('DD.MM.YY'),
    processing: false,
    updatedAt: Date.now().toString(),
  }
  await db.entries.insert(entry)
}

export async function removeEntry(
  id: string,
  db: MyDatabase,
  isListEntry: boolean
) {
  if (isListEntry) {
    await removeEntryFromList(db, id)
    return
  }
  const entry = await db.entries.findOne({ selector: { id } }).exec()
  if (entry) {
    try {
      await entry.remove()
      await removeEntryFromList(db, id)
    } catch (err) {
      console.log('err', err)
    }
  }
}

export async function update(id: string, edited: EditedEntry, db: MyDatabase) {
  const entry = await db.entries.findOne({ selector: { id } }).exec()
  let categories: string[]
  if (entry) {
    try {
      if (edited.categories) {
        categories = edited.categories.split(' ')
      } else {
        categories = entry.categories
      }
      const editedEntry: EntryInput = {
        id: entry.id,
        title: edited.title || entry.title,
        description: edited.description || entry.description,
        type: edited.url ? 'Link' : entry.type,
        url: edited.url || entry.url,
        categories,
        hashedKey: 'hashed',
        calendarDate: entry.calendarDate,
        processing: entry.processing,
        updatedAt: Date.now().toString(),
      }
      await entry.update({ $set: { ...editedEntry } })
    } catch (err) {
      console.error('could not update entry')
    }
  }
}

export async function seed(db: MyDatabase) {
  const array = [...Array(30).keys()]
  const objs = array.map((i) => {
    return {
      title: 'foo1 /' + i,
      calendarDate: dayjs(dayjs()).format('DD.MM.YY'),
      categories: ['Youtube'],
      hashedKey: 'yep',
      id: id().str as string,
      lists: [],
      processing: false,
      type: 'Note',
      url: '',
      updatedAt: Date.now().toString(),
    }
  })
  const result = await db.entries.bulkInsert(objs)
  console.log('seed ~ result', result)
  return result
}
