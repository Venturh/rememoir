import dayjs from 'dayjs'
import { ListInput } from '../../generated/graphql'
import { MyDatabase } from '..'
import { EditedList } from '../../types'

const id = require('bson-objectid')

export function getLists(
  db: MyDatabase,
  { category, date }: { category: string | undefined; date: string | undefined }
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
