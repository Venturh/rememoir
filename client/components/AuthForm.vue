//Todo: Switch auf Vee Validate wenn supported
<template>
  <form class="space-y-6 w- md:w-96" @submit.prevent="$emit('submit')">
    <Error v-if="error" :message="error">{{ error }}</Error>
    <div class="space-y-2">
      <slot />
      <div class="flex items-center justify-between">
        <p v-if="type === 'login'" class="font-medium">
          {{ $t('loginSub') }}<Links to="/register">{{ $t('signUp') }}</Links>
        </p>
        <p v-if="type === 'register'" class="font-medium">
          {{ $t('registerSub') }}<Links to="/login">{{ $t('signIn') }}</Links>
        </p>
        <Button type="submit">
          {{ type === 'register' ? $t('register') : $t('login') }}
        </Button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

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
  setup() {},
})
</script>
