export function createEntry(data: string) {
  const split = data.split(' ')
  let categories = split.filter((s) => s.includes('#'))
  if (categories) {
    categories = categories.map((s) => {
      split.splice(split.indexOf(s), 1)
      return s.substring(1)
    })
  }

  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  const match = data.match(expression)
  let contentUrl = ''
  if (match) {
    contentUrl = match[0]
    split.splice(split.indexOf(contentUrl, 1))
  }
  const contentType = match === null ? 'Note' : 'Link'

  const id = require('bson-objectid')
  return {
    id: id().str as string,
    contentText: split.join(' '),
    contentType,
    contentUrl: contentUrl === null ? '' : contentUrl,
    categories,
    hashedKey: 'hashed',
    calendarDate: Date().toString(),
    processing: false,
    updatedAt: Date.now().toString(),
  }
}
