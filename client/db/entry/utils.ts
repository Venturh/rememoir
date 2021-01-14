export function createEntry(data: string) {
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
  return {
    id: id().str as string,
    contentText: split.join(' '),
    contentType,
    contentUrl: contentUrl === null ? '' : contentUrl![0],
    categories,
    hashedKey: 'hashed',
    calendarDate: Date().toString(),
    processing: false,
    updatedAt: Date.now().toString(),
  }
}
