import { ref } from '@nuxtjs/composition-api'
import { MyDatabase } from '../db'
import { addEntry } from '../db/entry'
import { addList, getLists } from '../db/list'
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
    let contentUrl = ''

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
      contentUrl = match[0]
      split = split.filter((w) => w !== contentUrl)
    }
    const contentType = match === null ? 'Note' : 'Link'
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
          contentUrl,
          title,
          contentDescription: description,
          contentType,
        },
        db
      )
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
    result.value = { title, description, contentUrl, contentType, categories }
    console.log('result', data, result.value, loading)
  }

  return { result, loading, execute }
}

export function useQueryLists(db: MyDatabase) {
  const loading = ref(false)
  const lists = ref([])

  function execute() {
    const query = getLists(db)
    query.$.subscribe((results) => {
      loading.value = true
      lists.value = results
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
  }

  return { lists, loading, execute }
}
