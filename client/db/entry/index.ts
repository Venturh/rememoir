import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { addRxPlugin } from 'rxdb'

import { EntryInput } from '../../generated/graphql'
import { EditedEntry } from '../../types'
import { MyDatabase } from '../index'

import { encryptEntry } from '../../utils/crypto'
import { createEntry } from './utils'

addRxPlugin(RxDBUpdatePlugin)

export function queryEntries(db: MyDatabase) {
  return db.entries.find().sort({ updatedAt: 'desc' })
}

export async function add(data: string, db: MyDatabase) {
  const entry = createEntry(data)
  await db.entries.insert(entry)
}

export async function remove(id: string, db: MyDatabase) {
  const entry = await db.entries.findOne({ selector: { id } }).exec()
  if (entry) {
    try {
      await entry.remove()
    } catch (err) {
      console.error('could not remove entry')
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
      const test: EntryInput = {
        id: entry.id,
        contentText: edited.contentText || entry.contentText,
        contentType: edited.contentUrl ? 'Link' : entry.contentType,
        contentUrl: edited.contentUrl || entry.contentUrl,
        categories,
        hashedKey: 'hashed',
        calendarDate: entry.calendarDate,
        processing: entry.processing,
        updatedAt: Date.now().toString(),
      }

      const encrypedEntry = encryptEntry(test)

      await entry.update({ $set: { ...encrypedEntry } })
    } catch (err) {
      console.error('could not update entry')
    }
  }
}
