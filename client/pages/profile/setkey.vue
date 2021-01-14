<template>
  <Modal
    v-model="show"
    form
    title="Enter SecretKey to proceed"
    @confirm="action(true)"
    @cancel="action(false)"
  >
    <FormInput v-model="input" type="text"> Secret Key </FormInput>
  </Modal>
</template>

<script lang="ts">
import { useVerifySecretKeyMutation } from '@/generated/graphql'
import { hash, setSecretKey } from '@/utils/crypto'
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup() {
    const { router, localePath } = useContext().app
    const show = ref(true)
    const input = ref('')

    const { mutate: verify } = useVerifySecretKeyMutation(() => ({
      variables: {
        key: hash(input.value),
      },
    }))

    async function action(action: boolean) {
      if (action) {
        const { data } = await verify()
        if (data) {
          if (data.verifySecretKey) {
            show.value = false

            setSecretKey(input.value)
            router!.push(localePath('/entries'))
          } else {
            // TODO Show error
            console.log('key ist falsch')
          }
        } else {
          // TODO Show error
          console.log('server down')
        }
      } else {
        router!.push(localePath('/'))
      }
    }
    return { action, show, input }
  },
})
</script>
