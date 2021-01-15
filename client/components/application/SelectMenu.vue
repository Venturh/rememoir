//TODO Keyboard Navigation scroll
<template>
  <div v-if="open" class="relative">
    <div
      class="absolute z-50 w-full mt-1 rounded-md shadow-lg bg-primary"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
    >
      <ul
        ref="dropdown"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-item-3"
        class="overflow-auto text-base rounded-md bg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="(option, index) in options"
          :key="option"
          role="option"
          class="relative py-2 pl-3 cursor-default select-none pr-9"
          :class="selectedIndex === index ? 'bg-brand text-brandContrast' : ''"
          @click="setSelected()"
          @mouseenter="selectedIndex = index"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const selectedIndex = ref(0)
    function up() {
      if (selectedIndex.value > 0) selectedIndex.value -= 1
    }
    function down() {
      if (selectedIndex.value < props.options.length) selectedIndex.value += 1
    }

    function setSelected() {
      emit('selected', props.options[selectedIndex.value], props.name)
    }
    return { selectedIndex, up, down, setSelected }
  },
})
</script>
