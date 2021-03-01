import dayjs from 'dayjs'
import ObjectID from 'bson-objectid'
import { EntryInput, ListInput } from '../../generated/graphql'
import { MyDatabase } from '..'
import { Edited } from '../../types'

export function getLists(
  db: MyDatabase,
  {
    category,
    date,
  }: {
    category?: string
    date?: string
  }
) {
  if (!category) {
    if (!date) return db.lists.find().sort({ updatedAt: 'desc' })
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
  } else if (!date)
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
  categories: string[],
  calendarDate: string
) {
  const list: ListInput = {
    id: new ObjectID().str,
    title,
    description,
    categories,
    entries: [],
    hashedKey: '',
    calendarDate,
    processing: false,
    updatedAt: Date.now().toString(),
    archived: false,
    pinned: false,
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

export async function updateList(id: string, edited: Edited, db: MyDatabase) {
  const list = await db.lists.findOne({ selector: { id } }).exec()
  let categories: string[]
  if (list) {
    try {
      if (edited.categories) {
        categories = edited.categories.split(' ')
      } else {
        categories = list.categories
      }
      const Edited: ListInput = {
        id: list.id,
        title: edited.title || list.title,
        description: edited.description || list.description,
        categories,
        entries: list.entries,
        hashedKey: 'hashed',
        calendarDate: list.calendarDate,
        processing: list.processing,
        updatedAt: Date.now().toString(),
        pinned: edited.pinned ?? list.pinned,
        archived: edited.archived ?? list.archived,
      }

      await list.update({ $set: { ...Edited } })
    } catch (err) {
      console.error('could not update list')
    }
  }
}
export async function addEntryToList(
  id: string,
  entry: EntryInput,
  db: MyDatabase
) {
  const list = await db.lists.findOne({ selector: { id } }).exec()

  if (list) {
    try {
      const Edited: ListInput = {
        id: list.id,
        title: list.title,
        description: list.description,
        categories: list.categories,
        entries: [...list.entries, entry.id],
        hashedKey: 'hashed',
        calendarDate: list.calendarDate,
        processing: list.processing,
        updatedAt: Date.now().toString(),
      }
      await list.update({ $set: { ...Edited } })
    } catch (err) {
      console.error('could not update list', err)
    }
  }
}

export async function removeEntryFromList(db: MyDatabase, id: string) {
  const lists = await db.lists.find().exec()
  const find = lists.find((l) => l.entries.find((e) => e === id))
  if (find) {
    find.update({
      $set: { entries: find.entries.filter((e) => e !== id) },
    })
    return true
  }
  return false
}

export async function seedLists(db: MyDatabase) {
  const array = [...Array(60).keys()]
  const objs: ListInput[] = array.map((i) => {
    return {
      title: 'List ' + i,
      description: 'das ist die beschreibung von ' + i,
      calendarDate: dayjs().valueOf().toString(),
      categories: ['Youtube'],
      hashedKey: 'yep',
      entries: [],
      id: new ObjectID().str,
      processing: false,
      updatedAt: Date.now().toString(),
      archived: false,
      pinned: false,
    }
  })
  const result = await db.lists.bulkInsert(objs)
  console.log('seed ~ result', result)
  return result
}
