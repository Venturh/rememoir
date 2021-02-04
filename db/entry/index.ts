import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { addRxPlugin } from 'rxdb'

import dayjs from 'dayjs'
import { EntryInput } from '../../generated/graphql'
import { EditedEntry } from '../../types'
import { MyDatabase } from '../index'
import { removeEntryFromList } from '../list'
const id = require('bson-objectid')

addRxPlugin(RxDBUpdatePlugin)

// TODO: Clean this up
export function queryEntries(
  db: MyDatabase,
  {
    category,
    date,
  }: { category?: string | undefined; date?: string | undefined }
) {
  if (category === undefined) {
    if (date === undefined) return db.entries.find().sort({ updatedAt: 'desc' })
    else {
      const calendarDate = dayjs(date).format('DD.MM.YY')
      return db.entries
        .find({
          selector: {
            calendarDate: {
              $eq: calendarDate,
            },
          },
        })
        .sort({ updatedAt: 'desc' })
    }
  } else if (date === undefined)
    return db.entries
      .find({
        selector: {
          categories: { $in: [category] },
        },
      })
      .sort({ updatedAt: 'desc' })
  else {
    return db.entries
      .find({
        selector: {
          categories: { $in: [category] },
          calendarDate: { $eq: dayjs(date).format('DD.MM.YY') },
        },
      })
      .sort({ updatedAt: 'desc' })
  }
}

export async function addEntry(
  {
    title,
    description,
    type,
    url,
    categories,
  }: {
    title: string
    description: string
    categories: string[]
    type: string
    url: string
  },
  db: MyDatabase
) {
  const entry = {
    id: id().str as string,
    title,
    description,
    type,
    url,
    categories,
    hashedKey: 'hashed',
    calendarDate: dayjs().format('DD.MM.YY'),
    processing: false,
    updatedAt: Date.now().toString(),
    lists: [],
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
        lists: { ...entry.lists },
      }
      await entry.update({ $set: { ...editedEntry } })
    } catch (err) {
      console.error('could not update entry')
    }
  }
}
