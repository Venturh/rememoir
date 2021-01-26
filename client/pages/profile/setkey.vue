<template>
  <Modal
    v-model="show"
    form
    title="Enter SecretKey to proceed"
    :error="error"
    :button-names="['Send']"
    required
    @confirm="action(true)"
    @cancel="action(false)"
  >
    <FormInput v-model="input" type="text"> Secret Key </FormInput>
  </Modal>
</template>

<script lang="ts">
import { useVerifySecretKeyMutation } from '@/generated/graphql'
import { Error } from '@/types'
import { hash, setSecretKey } from '@/utils/crypto'
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup() {
    const { router, localePath } = useContext().app
    const show = ref(true)
    const input = ref('')
    const error = ref<Error>({ show: false, msg: '' })

    const { mutate: verify } = useVerifySecretKeyMutation(() => ({
      variables: {
        key: hash(input.value),
      },
    }))

    async function action(action: boolean) {
      if (action) {
        error.value.show = false
        const { data } = await verify()
        if (data) {
          if (data.verifySecretKey) {
            show.value = false

            setSecretKey(input.value)
            router!.push(localePath('/home/entries'))
          } else {
            // TODO Show error
            error.value = { show: true, msg: 'Secret Key wrong' }
          }
        } else {
          // TODO Show error
          console.log('server down')
        }
      } else {
        router!.push(localePath('/'))
      }
    }
    return { action, show, error, input }
  },
})
</script>
