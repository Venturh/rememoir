import { ref } from '@nuxtjs/composition-api'

export function usePagination(page: number = 1) {
  const currentPage = ref(page)

  const resetPage = () => {
    currentPage.value = 1
  }

  const next = () => {
    currentPage.value += 1
  }

  return { currentPage, next, resetPage }
}
