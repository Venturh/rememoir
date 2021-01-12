import { EntryInput } from '../../generated/graphql'
import { encryptEntry } from '../../utils/crypto'
import { MyDatabase } from '../index'

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

export async function remove(idToDelete: string, db: MyDatabase) {
  const entry = await db.entries
    .findOne({ selector: { id: idToDelete } })
    .exec()
  console.log('remove ~ entry', entry)
  if (entry) {
    try {
      await entry.remove()
    } catch (err) {
      console.error('could not remove entry')
      console.dir(err)
    }
  }
}
