import dayjs from 'dayjs'
import { entries } from 'lodash'
import { Entry, EntryInput, ListInput } from '../../generated/graphql'
import { MyDatabase } from '..'
import { EditedList } from '../../types'

const id = require('bson-objectid')

export function getLists(
  db: MyDatabase,
  {
    category,
    date,
  }: { category?: string | undefined; date?: string | undefined }
) {
  if (category === undefined) {
    if (date === undefined) return db.lists.find().sort({ updatedAt: 'desc' })
    else {
      const calendarDate = dayjs(date).format('DD.MM.YY')
      return db.lists
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
    return db.lists
      .find({
        selector: {
          categories: { $in: [category] },
        },
      })
      .sort({ updatedAt: 'desc' })
  else {
    return db.lists
      .find({
        selector: {
          categories: { $in: [category] },
          calendarDate: { $eq: dayjs(date).format('DD.MM.YY') },
        },
      })
      .sort({ updatedAt: 'desc' })
  }
}

export async function addList(
  db: MyDatabase,
  title: string,
  description: string,
  categories: string[]
) {
  const list: ListInput = {
    id: id().str as string,
    title,
    description,
    categories,
    entries: [],
    hashedKey: '',
    calendarDate: dayjs().format('DD.MM.YY'),
    processing: false,
    updatedAt: Date.now().toString(),
  }
  await db.lists.insert(list)
}

export async function removeList(id: string, db: MyDatabase) {
  const list = await db.lists.findOne({ selector: { id } }).exec()
  if (list) {
    try {
      await list.remove()
    } catch (err) {
      console.error('could not remove list')
    }
  }
}

export async function updateList(
  id: string,
  edited: EditedList,
  db: MyDatabase
) {
  const list = await db.lists.findOne({ selector: { id } }).exec()
  let categories: string[]
  if (list) {
    try {
      if (edited.categories) {
        categories = edited.categories.split(' ')
      } else {
        categories = list.categories
      }
      const editedList: ListInput = {
        id: list.id,
        title: edited.title || list.title,
        description: edited.description || list.description,
        categories,
        entries: list.entries,
        hashedKey: 'hashed',
        calendarDate: list.calendarDate,
        processing: list.processing,
        updatedAt: Date.now().toString(),
      }

      await list.update({ $set: { ...editedList } })
    } catch (err) {
      console.error('could not update list')
    }
  }
}
export async function addEntryToList(
  id: string,
  entryId: string,
  db: MyDatabase
) {
  const list = await db.lists.findOne({ selector: { id } }).exec()

  if (list) {
    try {
      const entryFind = await db.entries
        .findOne({ selector: { id: entryId } })
        .exec()
      console.log('found list,', list)

      const entry: EntryInput = {
        id: entryFind.id,
        title: entryFind.title,
        url: entryFind.url,
        type: entryFind.type,
        calendarDate: entryFind.calendarDate,
        categories: entryFind.categories,
        hashedKey: entryFind.hashedKey,
        processing: entryFind.processing,
        updatedAt: entryFind.updatedAt,
        deleted: entryFind.deleted,
        description: entryFind.description,
        preview: entryFind.preview,
      }

      // BUG: Das besser machen. Bekommen auch fields wie created ein rein...
      const editedList: ListInput = {
        id: list.id,
        title: list.title,
        description: list.description,
        categories: list.categories,
        entries: [...list.entries, entry],
        hashedKey: 'hashed',
        calendarDate: list.calendarDate,
        processing: list.processing,
        updatedAt: Date.now().toString(),
      }
      console.log('editedList', editedList.entries)
      await list.update({ $set: { ...editedList } })
    } catch (err) {
      console.error('could not update list', err)
    }
  }
}
