//textarea
<template>
  <input
    v-if="!expanded"
    type="search"
    autocomplete="off"
    :disabled="disabled"
    name="input"
    :value="inputValue"
    class="block w-full border rounded-lg border-borderPrimary bg-secondary sm:text-sm focus:ring-1 focus:ring-brand"
    :class="search ? 'pl-12' : 'pl-16 sm:pl-20 sm:pr-16'"
    :placeholder="placeholder"
    @input="$emit('update:inputValue', $event.target.value)"
  />
  <textarea
    v-else
    ref="textRef"
    :value="inputValue"
    class="block w-full p-2 border rounded-lg border-borderPrimary bg-secondary sm:text-sm focus:ring-1 focus:ring-brand"
    :placeholder="placeholder"
    @input="$emit('update:inputValue', $event.target.value)"
    @keydown.prevent.enter="$emit('enter')"
    @keydown.prevent.esc="$emit('cancel')"
  />
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted } from 'vue'

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputValue: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:inputValue', 'enter', 'cancel'],
  setup(props) {
    const textRef = ref<HTMLTextAreaElement>()

    onMounted(() => {
      if (props.expanded) {
        nextTick(() => textRef.value?.focus())
      }
    })
    return { textRef }
  },
})
</script>
