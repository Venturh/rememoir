import dayjs from 'dayjs'
import { ListInput } from '../../generated/graphql'
import { MyDatabase } from '..'
import { EditedList } from '../../types'

const id = require('bson-objectid')

export function getLists(db: MyDatabase) {
  const lists = db.lists.find().sort({ updatedAt: 'desc' })
  return lists
}

export async function addList(
  db: MyDatabase,
  title: string,
  description: string,
  categories: string[]
) {
  console.log('db', db)
  console.log('title', title)
  console.log('description', description)
  console.log('categories', categories)
  const list: ListInput = {
    id: id().str as string,
    title,
    description,
    categories,
    entries: [],
    hashedKey: 'hashed',
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
