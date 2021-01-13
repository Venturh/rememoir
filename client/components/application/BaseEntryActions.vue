<template>
  <div>
    <Modal
      v-model="showModal"
      form
      @confirm="submitEditedEntry"
      @cancel="showModal = false"
    >
      <template v-slot:title>Edit Entry</template>
      <FormInput
        v-model="editedEntry.contentText"
        label="Text"
        type="text"
        :placeholder="entry.contentText"
      >
        Text
      </FormInput>
      <FormInput
        v-model="editedEntry.contentUrl"
        label="Text"
        type="text"
        :placeholder="entry.contentUrl"
      >
        Url
      </FormInput>
      <FormInput
        v-model="categories"
        label="Text"
        type="text"
        :placeholder="entry.categories.join(' ')"
      >
        Categories
      </FormInput>
    </Modal>
    <Menu
      v-if="showMenu"
      :primary-items="primaryMenuItems"
      :secondary-items="secondaryMenuItems"
      class="absolute right-5 top-10"
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
import { isEmpty } from 'lodash'
import {
  ArchiveIcon,
  BookmarkIcon,
  DeleteIcon,
  EditIcon,
  MailIcon,
  Share2Icon,
  SkipBackIcon,
  TwitterIcon,
} from 'vue-feather-icons'
import { remove, update } from '@/db/entry'
import { Entry } from '@/generated/graphql'
import { EditedEntry } from '@/types'

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
    const primaryMenuItems = [
      { name: 'Pin', icon: BookmarkIcon, action: 'pin' },
      { name: 'Edit', icon: EditIcon, action: 'edit' },
      { name: 'Archive', icon: ArchiveIcon, action: 'archieve' },
      { name: 'Delete', icon: DeleteIcon, action: 'delete' },
      {
        name: 'Share',
        icon: Share2Icon,
        goto: 'secondary',
      },
    ]

    const secondaryMenuItems = [
      { name: 'Copy Link', icon: BookmarkIcon, action: 'link' },
      { name: 'Twitter', icon: TwitterIcon, action: 'twitter' },
      { name: 'Mail', icon: MailIcon, action: 'mail' },
      { name: 'Back', icon: SkipBackIcon, goto: 'primary', action: 'back' },
    ]

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
