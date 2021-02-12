<template>
  <div
    class="relative flex flex-col w-full h-full p-3 space-y-3 rounded-md shadow-sm dark:ring-1 dark:shadow-none bg-secondary dark:ring-borderPrimary"
    @click="$emit('click')"
  >
    <slot />
    <div class="flex items-center justify-between">
      <div class="flex w-2/3 space-x-2">
        <Label
          v-for="category in categories.slice(0, 4)"
          :key="category"
          class="flex-shrink-0"
          small
        >
          {{ category }}
        </Label>
        <Tooltip>
          <Label v-if="categories.length > 4" class="flex-shrink-0" small>
            +{{ categories.length - 4 }}
          </Label>
          <template v-slot:content>
            <p
              v-for="category in categories.slice(4)"
              :key="category"
              class="text-sm"
            >
              {{ category }}
            </p>
          </template>
        </Tooltip>
      </div>
      <span class="text-sm">{{ timeFrom }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    timeFrom: {
      type: String,
      default: '',
    },
  },
})
</script>
