import { MyDatabase } from '../db'
import { addList } from '../db/list'

export async function handleAdd(data: string, db: MyDatabase) {
  let split = data.split(' ')

  let list = split.find((s) => s.includes('@'))

  let categories = split.filter((s) => s.includes('#'))
  if (categories) {
    categories = categories.map((s) => {
      split = split.filter((w) => w !== s)
      return s.substring(1)
    })
  }

  if (list) {
    split = split.filter((w) => w !== list)
    list = list.substring(1)
    let description: string = null
    if (split.length > 0) description = split.join(' ')
    await addList(db, list, description, categories)

    return { categories, list, description }
  }

  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  const match = data.match(expression)
  let contentUrl = ''
  if (match) {
    contentUrl = match[0]
    split = split.filter((w) => w !== contentUrl)
  }
  const contentType = match === null ? 'Note' : 'Link'

  // Maybe description for longer stuff
  let description: string | null = null
  description = split.find((s) => s.includes('//'))
  if (description) {
    split = split.filter((w) => w !== description)
    description = description.substring(2)
  }

  console.log('all', split, categories, contentUrl, contentType, list)
  return { categories, contentUrl, contentType, list }
}
