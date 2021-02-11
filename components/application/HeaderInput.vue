//textarea
<template>
  <input
    v-if="!expanded"
    type="search"
    autocomplete="off"
    :disabled="disabled"
    name="input"
    :value="inputValue"
    class="block w-full border border-transparent rounded-lg bg-secondary focus:outline-none"
    :class="search ? 'pl-12' : 'pl-16 sm:pl-20 sm:pr-16'"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  />
  <textarea
    v-else
    ref="textRef"
    :value="inputValue"
    class="block w-full border border-transparent rounded-md bg-primary focus:bg-secondary focus:ring-brand focus:border-brand sm:text-sm"
    :class="search ? 'pl-12' : 'pl-16 sm:pl-32'"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    @keydown.prevent.enter="$emit('enter')"
    @keydown.prevent.esc="$emit('cancel')"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  nextTick,
  onMounted,
} from '@nuxtjs/composition-api'

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
