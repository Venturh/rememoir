<template>
  <div>
    <button
      class="flex items-center justify-between w-full p-2 mt-1 space-x-4 border rounded-md bg-secondary border-borderPrimary"
      @click="$emit('update:showModal', true)"
    >
      <div class="flex items-center space-x-4">
        <Icon :icon="RiSearch2Line" color="brand" />
        <span class="truncate text-secondary">
          {{ t('searchPlaceholder') }}</span
        >
      </div>
      <div class="items-center hidden space-x-2 lg:flex">
        <Button
          v-for="button in buttons"
          :key="button"
          class="px-2 py-1"
          variant="brand25"
          padding
          small
          @click.stop="$emit('keyAction', button)"
        >
          Ctrl {{ button.toUpperCase() }}
        </Button>
      </div>
    </button>
    <Search
      v-if="show"
      :model-value="show"
      @update:modelValue="$emit('update:showModal', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiSearch2Line } from 'vue-remix-icons'

const props = defineProps<{ showModal: boolean }>()
defineEmit(['keyAction', 'update:showModal'])

const { t } = useI18n()
const show = ref(props.showModal)
const buttons = ['k', 'e', 'l']
watch(
  () => props.showModal,
  (val: boolean) => {
    show.value = val
  }
)
</script>
