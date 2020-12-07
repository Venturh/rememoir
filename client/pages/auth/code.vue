<template>
  <main>
    <div class="flex flex-col space-y-5">
      <div class="space-y-2 font-semibold">
        <h1 class="text-6xl text-primary">{{ $t('yourKey') }}</h1>
        <h2 class="text-3xl text-secondary">{{ $t('yourKeySub') }}</h2>
      </div>
      <div class="p-4 space-y-4 rounded-lg bg-secondary">
        <p class="text-lg font-semibold">{{ $t('yourKeyDescription') }}</p>
        <div class="p-2 bg-primary">
          <p class="text-xl font-semibold">{{ secretKey }}</p>
        </div>
        <div class="flex justify-between">
          <Button @click="download">Download</Button>
          <Button @click="forward">Continue</Button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { getSectretKey } from '@/utils/crypto'

export default defineComponent({
  layout: 'auth',
  setup() {
    const { query, app } = useContext()
    const { router, localePath } = app

    const { id } = query.value

    if (!id) {
      router!.push('/')
    }

    const error = ref('')
    const secretKey = getSectretKey()

    function forward() {
      router!.push(localePath(`/auth/accountVerification?id=${id}`))
    }

    function download() {
      // TODO: Download key as file
    }

    return {
      forward,
      download,
      error,
      secretKey,
    }
  },
})
</script>
