<template>
  <AppLayout>
    <Icon :icon="RiHomeLine" />
    <Layout />
  </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { RiHomeLine } from 'vue-remix-icons'
export default defineComponent({
  setup() {
    return { RiHomeLine }
  },
})
</script>
