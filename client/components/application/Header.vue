<template>
  <div class="flex items-center justify-between">
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
import DatabaseService from '@/db/db'
import { EntryInput } from '@/generated/graphql'
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

    async function add(data: string) {
      const split = data.split(' ')
      let categories = split.filter((s) => s.includes('#'))
      if (categories) {
        categories = categories.map((s) => {
          split.splice(split.indexOf(s), 1)
          return s.substring(1)
        })
      }

      const contentUrl = data.match(/\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/g)
      if (contentUrl) split.splice(split.indexOf(contentUrl[0], 1))
      const contentType = contentUrl === null ? 'Note' : 'Link'

      const id = require('bson-objectid')
      const entry: EntryInput = {
        id: id().str,
        contentText: split.join(' '),
        contentType,
        contentUrl: contentUrl === null ? '' : contentUrl![0],
        // contentUrl:'https://open.spotify.com/track/1J2OlTIPluzOmf3RX8eKhT?si=vnZacwXhTEGC4Hbb95u2mg',
        categories,
        hashedKey: 'hashed',
        calendarDate: Date().toString(),
        processing: false,
        updatedAt: Date.now().toString(),
      }
      const db = await DatabaseService.get()
      await db.entries.insert(entry)
      inputType.value = 'search'
      input.value = ''
    }

    return { input, add, inputType }
  },
})
</script>
