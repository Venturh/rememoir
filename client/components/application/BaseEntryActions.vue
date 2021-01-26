<template>
  <div class="absolute z-50 top-10 right-5">
    <Modal
      v-if="showEditModal"
      v-model="showEditModal"
      form
      @confirm="submitEditedEntry"
      @cancel="showEditModal = false"
    >
      <template v-slot:title>Edit Entry</template>
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
        :placeholder="entry.categories.join(' ')"
      />
    </Modal>
    <Menu
      v-if="showMenu"
      :primary-items="primaryMenuItems"
      :secondary-items="secondaryItems"
      @mouseleave="$emit('hideMenu', true)"
      @click="handleMenu"
    />
  </div>
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
import { Entry } from '@/generated/graphql'

import {
  hoverPrimaryMenuItems as primaryMenuItems,
  hoverSecondaryMenuItems as secondaryMenuItems,
} from '@/config/data'

import { isEmpty } from 'lodash'
import { ListIcon, SkipBackIcon } from 'vue-feather-icons'

import { remove, update } from '@/db/entry'
import { useQueryLists } from '@/hooks/database'
import { addEntryToList } from '@/db/list'

export default defineComponent({
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: Object as PropType<Entry>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const { $db } = useContext().app
    const editedEntry = ref<EditedEntry>({})
    const showEditModal = ref(false)
    const showLists = ref(false)
    const { lists, execute } = useQueryLists($db)

    const categories = computed({
      get: () => editedEntry.value.categories,
      set: (val) => {
        editedEntry.value.categories = val
      },
    })

    const secondaryItems: ComputedRef<HoverMenuItem[]> = computed(() => {
      const listItems: HoverMenuItem[] = lists.value.map((l) => {
        return { icon: ListIcon, name: l.title, goto: '', info: l.id }
      })
      listItems[listItems.length] = {
        name: 'back',
        icon: SkipBackIcon,
        goto: 'primary',
      }
      return showLists.value ? listItems : secondaryMenuItems
    })

    function handleMenu({ name, info }: { name: string; info: string }) {
      switch (name) {
        case 'delete':
          remove(props.entry.id, $db)
          break
        case 'edit':
          emit('showMenu', false)
          showEditModal.value = true
          break
        case 'addToList':
          execute()
          showLists.value = true
          return
        case 'share':
          return
        case 'back':
          showLists.value = false
          return
        case 'pin':
          break
        case 'archive':
          break

        default:
          addEntryToList(info, props.entry.id, $db)
      }

      emit('showMenu', false)
    }

    function submitEditedEntry() {
      console.log('toSend', editedEntry.value)
      if (!isEmpty(editedEntry.value))
        update(props.entry.id, editedEntry.value, $db)
      editedEntry.value = {}

      showEditModal.value = false
    }

    return {
      showEditModal,
      primaryMenuItems,
      secondaryItems,
      handleMenu,
      categories,
      editedEntry,
      submitEditedEntry,
    }
  },
})
</script>
