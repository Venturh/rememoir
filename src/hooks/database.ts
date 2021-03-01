import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
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
    date,
    listId,
  }: {
    data: string
    target: HeaderInputType
    description: string
    date: Dayjs
    listId: string
  }) {
    loading.value = true
    let split = data.split(' ')

    let categories = split.filter((s) => s.includes('#'))
    let url = ''
    const calendarDate = date.valueOf().toString()
    console.log('useAddDb ~ calendarDate', calendarDate)
    if (categories) {
      categories = categories.map((s) => {
        split = split.filter((w) => w !== s)
        return s.substring(1)
      })
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
      await addList(db, title, description, categories, calendarDate)
    } else {
      await addEntry(
        {
          categories,
          url,
          title,
          description,
          type,
          calendarDate,
          listId,
        },
        db
      )
    }

    result.value = { title, description, url, type, categories }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    loading.value = false
  }

  return { result, loading, execute }
}
