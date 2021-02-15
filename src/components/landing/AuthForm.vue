//Todo: Switch auf Vee Validate wenn supported
<template>
  <form class="space-y-6" @submit.prevent="$emit('submit')">
    <Error v-if="error" :message="error">{{ error }}</Error>

    <div class="space-y-2">
      <slot />
      <div class="flex items-center justify-between">
        <p v-if="type === 'login'" class="font-medium">
          {{ t('loginSub')
          }}<Links to="/auth/register">{{ t('signUp') }}</Links>
        </p>
        <p v-if="type === 'register'" class="font-medium">
          {{ t('registerSub')
          }}<Links to="/auth/login">{{ t('signIn') }}</Links>
        </p>
        <Button type="submit">
          {{ t(type) }}
        </Button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'register',
    },
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
