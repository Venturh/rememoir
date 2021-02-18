<template>
  <div>
    <button
      class="flex items-center justify-between w-full p-2 mt-1 space-x-4 border rounded-md bg-secondary border-borderPrimary"
      @click="show = true"
    >
      <div class="flex items-center space-x-4">
        <Icon :icon="RiSearch2Line" color="brand" />
        <span class="truncate text-secondary">
          {{ t('searchPlaceholder') }}</span
        >
      </div>
      <div class="items-center hidden space-x-2 sm:flex">
        <Button
          v-for="button in buttons"
          :key="button"
          class="px-2 py-1"
          variant="brand25"
          padding
          small
          @click="$emit('keyAction', button)"
        >
          Ctrl {{ button.toUpperCase() }}
        </Button>
      </div>
    </button>

    <div class="absolute">
      <Search v-if="show" v-model="show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiSearch2Line } from 'vue-remix-icons'

export default defineComponent({
  props: { showModal: Boolean },
  emits: ['keyAction', 'update'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const show = ref(false)
    watch(
      () => props.showModal,
      (val: boolean) => (show.value = val)
    )
    watch(
      () => show.value,
      () => emit('update', show.value)
    )

    const buttons = ['k', 'e', 'l']
    return { show, RiSearch2Line, t, buttons }
  },
})
</script>
