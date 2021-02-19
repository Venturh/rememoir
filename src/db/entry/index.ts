import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { addRxPlugin } from 'rxdb'

import dayjs from 'dayjs'
import ObjectID from 'bson-objectid'
import { EntryInput } from '../../generated/graphql'
import { EditedEntry } from '../../types'
import { MyDatabase } from '../index'
import { removeEntryFromList, addEntryToList } from '../list'

addRxPlugin(RxDBUpdatePlugin)

type NewEntry = {
  title: string
  description: string
  categories: string[]
  type: string
  url: string
  calendarDate: string
  listId?: string
}

export async function addEntry(
  { title, description, type, url, categories, calendarDate, listId }: NewEntry,
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
    calendarDate,
    processing: false,
    updatedAt: Date.now().toString(),
    archived: false,
    pinned: false,
  }

  await db.entries.insert(entry)
  if (listId) await addEntryToList(listId, entry, db)
}

export async function removeEntry(
  id: string,
  db: MyDatabase
  // isListEntry: boolean
) {
  // if (isListEntry) {
  //   await removeEntryFromList(db, id)
  //   return
  // }
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
        pinned: edited.pinned ?? entry.pinned,
        archived: edited.archived ?? entry.archived,
        categories,
        hashedKey: 'hashed',
        calendarDate: entry.calendarDate,
        processing: entry.processing,
        updatedAt: Date.now().toString(),
      }
      console.log('update ~ editedEntry', editedEntry)
      await entry.update({ $set: { ...editedEntry } })
    } catch (err) {
      console.error('could not update entry')
    }
  }
}

export async function seed(db: MyDatabase) {
  const array = [...Array(60).keys()]
  const objs: EntryInput[] = array.map((i) => {
    return {
      title: 'a ' + i,
      calendarDate: dayjs(dayjs()).format('DD.MM.YY'),
      categories: ['Youtube'],
      hashedKey: 'yep',
      id: new ObjectID().str,
      processing: false,
      type: 'Note',
      url: '',
      updatedAt: Date.now().toString(),
      archived: false,
      pinned: false,
      description: 'Test Beschreibung ' + i,
    }
  })
  const result = await db.entries.bulkInsert(objs)
  console.log('seed ~ result', result)
  return result
}
