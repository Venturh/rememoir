<template>
  <BaseActions
    :primary-menu="hoverEntryPrimaryMenu"
    :secondary-menu="secondaryItems"
    @edit="submit"
    @remove="remove"
    @showLists="toggleLists"
    @addToList="add"
    @pin="pin"
    @back="showLists = false"
  >
    <FormInput
      v-model="editedEntry.title"
      label="Title"
      type="text"
      :placeholder="entry.title"
    />
    <FormInput
      v-model="editedEntry.description"
      label="Description"
      type="text"
      :placeholder="entry.description"
    />
    <FormInput
      v-model="editedEntry.url"
      label="Link"
      type="text"
      :placeholder="entry.url"
    />
    <FormInput
      v-model="categories"
      label="Categories"
      type="text"
      :placeholder="entry.categories ? entry.categories.join(' ') : ''"
    />
  </BaseActions>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import { EditedEntry, HoverMenuItem } from '@/types'
import { EntryInput } from '@/generated/graphql'

import { hoverEntryPrimaryMenu, hoverSecondaryMenu } from '@/config/data'

import { isEmpty } from 'lodash'

import { removeEntry, update } from '@/db/entry'
import { useAvaibleLists } from '@/hooks'
import { ListIcon, SkipBackIcon } from 'vue-feather-icons'
import { addEntryToList } from '@/db/list'

export default defineComponent({
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: Object as PropType<EntryInput>,
      default: () => {},
    },
    isListEntry: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { $db } = useContext().app
    const editedEntry = ref<EditedEntry>({})
    const showEditModal = ref(false)
    const showLists = ref(false)
    const { avaibleLists } = useAvaibleLists($db, props.entry.id)

    const categories = computed({
      get: () => editedEntry.value.categories,
      set: (val) => {
        editedEntry.value.categories = val
      },
    })

    const secondaryItems: ComputedRef<HoverMenuItem[]> = computed(() => {
      const listItems: HoverMenuItem[] = avaibleLists.value.map((l) => {
        return { name: l.text, icon: ListIcon, info: l.info }
      })
      listItems[listItems.length] = {
        name: 'back',
        icon: SkipBackIcon,
        goto: 'primary',
      }
      return showLists.value ? listItems : hoverSecondaryMenu
    })

    function toggleLists() {
      showLists.value = true
    }

    function remove() {
      removeEntry(props.entry.id, $db, props.isListEntry)
    }

    function add(id: string) {
      addEntryToList(id, props.entry, $db)
    }

    async function pin() {
      await update(props.entry.id, { pinned: true }, $db)
    }

    async function submit() {
      if (!isEmpty(editedEntry.value))
        await update(props.entry.id, editedEntry.value, $db)
      editedEntry.value = {}

      showEditModal.value = false
    }

    return {
      showEditModal,
      showLists,
      hoverEntryPrimaryMenu,
      secondaryItems,
      remove,
      categories,
      editedEntry,
      submit,
      toggleLists,
      add,
      pin,
    }
  },
})
</script>
