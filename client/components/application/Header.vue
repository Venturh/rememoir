<template>
  <div class="flex items-center justify-between space-x-2">
    <div class="lg:hidden">
      <IconOnlyButton @click="$emit('sidebartoggle')">
        <MenuIcon class="stroke-current text-brand" />
      </IconOnlyButton>
    </div>
    <HeaderSearch
      v-if="inputType === 'search'"
      class="sm:max-w-md md:max-w-lg lg:max-w-xl"
      :placeholder="$t('searchPlaceholder')"
    />
    <HeaderInput
      v-else
      v-model="input"
      :placeholder="$t('addNewEntry')"
      class="sm:max-w-md md:max-w-lg lg:max-w-xl"
      @action="add"
    />
    <ButtonOrLink
      class="flex items-center h-full p-2 space-x-2 rounded-lg bg-secondary"
      @click="inputType = 'addEntry'"
    >
      <PlusIcon class="fill-current text-brand" size="1.5x" />
      <span class="hidden lg:block">Add Entry</span>
    </ButtonOrLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { MenuIcon, PlusIcon } from 'vue-feather-icons'
export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'search',
    },
  },
  components: {
    MenuIcon,
    PlusIcon,
  },
  setup(props) {
    const input = ref('')
    const inputType = ref(props.type)

    watch(
      () => props.type,
      (value) => {
        inputType.value = value
      }
    )

    function add(data: string) {
      console.log('🚀 ~ file: Header.vue ~ line 33 ~ add ~ data', data)
    }

    return { input, add, inputType }
  },
})
</script>
