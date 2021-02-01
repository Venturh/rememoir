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
    description,
  }: {
    data: string
    target: HeaderInputType
    description: string
  }) {
    loading.value = true
    let split = data.split(' ')
    let list = split.find((s) => s.includes('@'))
    let categories = split.filter((s) => s.includes('#'))
    let url = ''

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

    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const match = data.match(expression)

    if (match) {
      url = match[0]
      split = split.filter((w) => w !== url)
    }
    const type = match === null ? 'Note' : 'Link'
    const title = split.join(' ')

    if (target === 'list') {
      await addList(db, title, description, categories)
      setTimeout(() => {
        loading.value = false
      }, 1000)
    } else {
      await addEntry(
        {
          categories,
          url,
          title,
          description,
          type,
        },
        db
      )
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
    result.value = { title, description, url, type, categories }
  }

  return { result, loading, execute }
}
