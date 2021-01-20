import { MyDatabase } from '../db'
import { addEntry } from '../db/entry'
import { addList } from '../db/list'
import { HeaderInputType } from '../types'

export async function handleAdd({
  data,
  target,
  db,
}: {
  data: string
  target: HeaderInputType
  db: MyDatabase
}) {
  let split = data.split(' ')

  let list = split.find((s) => s.includes('@'))
  let categories = split.filter((s) => s.includes('#'))
  let contentUrl = ''
  let desc = split.find((s) => s.includes('//'))

  if (categories) {
    categories = categories.map((s) => {
      split = split.filter((w) => w !== s)
      return s.substring(1)
    })
  }

  if (list) {
    split = split.filter((w) => w !== list)
    list = list.substring(1)
  }
  if (desc) {
    split = split.filter((w) => w !== desc)
    desc = desc.substring(2)
  }

  if (target === 'list') {
    const title = split.join(' ')

    return await addList(db, title, desc, categories)
  } else {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const match = data.match(expression)

    if (match) {
      contentUrl = match[0]
      split = split.filter((w) => w !== contentUrl)
    }
    const contentType = match === null ? 'Note' : 'Link'
    const title = split.join(' ')
    console.log('all', {
      title: split.join(' '),
      desc,
      categories,
      contentType,
      contentUrl,
    })
    await addEntry(
      { categories, contentUrl, contentText: title, contentType },
      db
    )
    return { categories, contentUrl, contentType, list }
  }
}
