import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)

  function setLoading(value: boolean) {
    loading.value = value
  }

  return { loading, setLoading }
}
