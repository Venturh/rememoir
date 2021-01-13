import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { addRxPlugin } from 'rxdb'
import { EntryInput } from '../../generated/graphql'
import { encryptEntry } from '../../utils/crypto'
import { MyDatabase } from '../index'
import { EditedEntry } from '../../types'
addRxPlugin(RxDBUpdatePlugin)

export async function add(data: string, db: MyDatabase) {
  const split = data.split(' ')
  let categories = split.filter((s) => s.includes('#'))
  if (categories) {
    categories = categories.map((s) => {
      split.splice(split.indexOf(s), 1)
      return s.substring(1)
    })
  }

  const contentUrl = data.match(/\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/g)
  if (contentUrl) split.splice(split.indexOf(contentUrl[0], 1))
  const contentType = contentUrl === null ? 'Note' : 'Link'

  const id = require('bson-objectid')
  const entry: EntryInput = {
    id: id().str,
    contentText: split.join(' '),
    contentType,
    contentUrl: contentUrl === null ? '' : contentUrl![0],
    categories,
    hashedKey: 'hashed',
    calendarDate: Date().toString(),
    processing: false,
    updatedAt: Date.now().toString(),
  }
  const encrypedEntry = encryptEntry(entry)
  await db.entries.insert(encrypedEntry)
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
