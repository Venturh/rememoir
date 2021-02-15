<template>
  <AuthLayout>
    <div class="flex flex-col space-y-5">
      <div class="space-y-2">
        <h1>{{ t('yourKey') }}</h1>
        <h2>{{ t('yourKeySub') }}</h2>
      </div>
      <div class="p-4 space-y-4 rounded-lg bg-secondary">
        <p class="text-lg font-semibold">{{ t('yourKeyDescription') }}</p>
        <div class="p-2 bg-primary">
          <p class="text-xl font-semibold">{{ secretKey }}</p>
        </div>
        <div class="flex justify-between">
          <Button @click="download">Download</Button>
          <Button @click="forward">Continue</Button>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getSectretKey } from '@/utils/crypto'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { push } = useRouter()
    const { query } = useRoute()

    const { id } = query

    if (!id) {
      push('/')
    }

    const error = ref('')
    const secretKey = getSectretKey()

    function forward() {
      push(`/auth/accountVerification?id=${id}`)
    }

    function download() {
      // TODO: Download key as file
    }

    return {
      t,
      forward,
      download,
      error,
      secretKey,
    }
  },
})
</script>
