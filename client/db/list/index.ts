import dayjs from 'dayjs'
import { ListInput } from '../../generated/graphql'
import { MyDatabase } from '../index'

export function getLists(db: MyDatabase) {
  const lists = db.lists.find().sort({ updatedAt: 'desc' })
  return lists
}

export async function addList(db: MyDatabase) {
  const id = require('bson-objectid')
  const list: ListInput = {
    id: id().str as string,
    title: 'TestList with Entry2',
    description: 'Beschreibung',
    categories: ['Nix'],
    entries: [
      {
        id: '6006aa307544fbcea465bb79',
        contentText: 'U2FsdGVkX1/CTavHq3UIFVbrpZkUW7JpPlnJSoZ9UQA=',
        contentType: 'Note',
        categories: [],
        updatedAt: '1611049520320',
        hashedKey:
          'U2FsdGVkX1/Vlqccs/ffZi31cCt2h5a63aGW/S7yJtO1CdG4ZSqz74EQsQWMxKQyYsCpLzgwyvignCqi3Dl8SQ==',
        processing: false,
        calendarDate: '19.01.21',
        deleted: false,
        contentUrl: '',
      },
    ],
    hashedKey: 'hashed',
    calendarDate: dayjs().format('DD.MM.YY'),
    processing: false,
    updatedAt: Date.now().toString(),
  }
  await db.lists.insert(list)
}
