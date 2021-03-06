<template>
  <AuthLayout title="yourKey" subtitle="yourKeySub">
    <div class="p-4 space-y-4 rounded-lg bg-secondary">
      <p class="text-lg font-semibold">{{ t('yourKeyDescription') }}</p>
      <div class="p-2 bg-primary">
        <p class="text-xl font-semibold">{{ secretKey }}</p>
      </div>
      <div class="flex justify-between">
        <Button variant="brand25" @click="download">Download</Button>
        <Button variant="brand25" @click="forward">Continue</Button>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getSectretKey } from '@/utils/crypto'

const { push } = useRouter()
const { query } = useRoute()
const { t } = useI18n()
const { id } = query

if (!id) {
  push('/')
}

const secretKey = getSectretKey()

function forward() {
  push(`/auth/accountVerification?id=${id}`)
}

function download() {
  var element = document.createElement('a')
  const text = `${t('yourKey')}: ${secretKey}`
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', 'projectm_secretkey')

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
</script>
