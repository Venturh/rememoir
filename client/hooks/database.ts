import { ref } from '@nuxtjs/composition-api'
import { MyDatabase } from '../db'
import { addEntry } from '../db/entry'
import { addList } from '../db/list'
import { HeaderInputType } from '../types'

export function useAddDb({ db }: { db: MyDatabase }) {
  const loading = ref(false)
  const result = ref({})

  async function execute({
    data,
    target,
  }: {
    data: string
    target: HeaderInputType
  }) {
    loading.value = true
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

    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const match = data.match(expression)

    if (match) {
      contentUrl = match[0]
      split = split.filter((w) => w !== contentUrl)
    }
    const contentType = match === null ? 'Note' : 'Link'
    const title = split.join(' ')

    if (target === 'list') {
      // await addList(db, title, desc, categories)
    } else {
      // await addEntry(
      //   { categories, contentUrl, contentText: title, contentType },
      //   db
      // )
    }
    result.value = { title, desc, contentUrl, contentType, categories }
    console.log('result', data, result.value, loading)

    setTimeout(() => {
      loading.value = false
    }, 2000)
  }

  return { result, loading, execute }
}
