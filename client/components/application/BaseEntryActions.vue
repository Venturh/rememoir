<template>
  <div class="absolute z-50 top-10 right-5">
    <Modal
      v-if="showModal"
      v-model="showModal"
      form
      @confirm="submitEditedEntry"
      @cancel="showModal = false"
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
      :secondary-items="secondaryMenuItems"
      @mouseleave="$emit('hideMenu', true)"
      @click="handleMenu"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import { EditedEntry } from '@/types'
import { Entry } from '@/generated/graphql'

import {
  hoverPrimaryMenuItems as primaryMenuItems,
  hoverSecondaryMenuItems as secondaryMenuItems,
} from '@/config/data'

import { isEmpty } from 'lodash'
import { remove, update } from '@/db/entry'

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
    const showModal = ref(false)

    const categories = computed({
      get: () => editedEntry.value.categories,
      set: (val) => {
        editedEntry.value.categories = val
      },
    })

    function handleMenu(itemName: string) {
      switch (itemName) {
        case 'delete':
          remove(props.entry.id, $db)
          break
        case 'edit':
          emit('showMenu', false)
          showModal.value = true
          break

        default:
          break
      }
      emit('showMenu', false)
    }

    function submitEditedEntry() {
      console.log('toSend', editedEntry.value)
      if (!isEmpty(editedEntry.value))
        update(props.entry.id, editedEntry.value, $db)
      editedEntry.value = {}

      showModal.value = false
    }

    return {
      showModal,
      primaryMenuItems,
      secondaryMenuItems,
      handleMenu,
      categories,
      editedEntry,
      submitEditedEntry,
    }
  },
})
</script>
