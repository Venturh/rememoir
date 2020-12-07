<template>
  <main class="flex flex-col items-center mt-36">
    <div class="flex flex-col space-y-10">
      <div class="space-y-2 font-semibold">
        <h1 class="text-6xl text-primary">{{ $t('confirm') }}</h1>
        <h2 class="text-3xl text-secondary">{{ $t('checkInbox') }}</h2>
      </div>
      <div>
        <p class="text-3xl">{{ $t('yourKey') }}</p>
        <p class="text-2xl">{{ secretKey }}</p>
      </div>
      <form class="space-y-6 w-80" @submit.prevent="verificate">
        <FormInput v-model="verificationCode" type="text">{{
          $t('verificationCode')
        }}</FormInput>
        <Button type="submit"> {{ $t('submit') }} </Button>
      </form>
      <Error v-if="error" :message="error" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { setAccessToken } from '@/utils/accessToken'
import { useVerifyAccountByEmailMutation } from '@/generated/graphql'
import { getSectretKey } from '@/utils/crypto'

export default defineComponent({
  layout: 'landing',
  setup(props, { root }) {
    const router = root.$router

    const id: string = root.$route.query.id as string

    const verificationCode = ref('')
    const error = ref('')
    const secretKey = getSectretKey()
    const { mutate: sendVerification } = useVerifyAccountByEmailMutation(
      () => ({
        variables: { id, code: verificationCode.value },
      })
    )

    async function verificate() {
      const { data } = await sendVerification()
      const { errors, accessToken } = data!.verifyEmailCode
      if (errors) {
        error.value = errors.message
      } else {
        setAccessToken(accessToken!)
        router.push('/entries')
      }
    }

    return {
      verificate,
      sendVerification,
      verificationCode,
      error,
      secretKey,
    }
  },
})
</script>
