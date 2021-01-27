import { ref } from '@nuxtjs/composition-api'
import { MyDatabase } from '../db'
import { addEntry } from '../db/entry'
import { addList, getLists } from '../db/list'
import { ListInput } from '../generated/graphql'
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
    console.log('result', data, result.value, loading)
  }

  return { result, loading, execute }
}

export function useQueryLists(db: MyDatabase, id?: string) {
  const loading = ref(false)
  const lists = ref<Array<ListInput>>([])

  function execute() {
    console.log('execute ~ query', id, db)
    const query = getLists(db, { id })

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
export function useList(db: MyDatabase, id: string) {
  const loading = ref(false)
  const list = ref<ListInput>()

  function execute() {
    const query = getLists(db, { id })
    query.$.subscribe((results) => {
      loading.value = true
      list.value = results[0]
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
  }

  return { list, loading, execute }
}
