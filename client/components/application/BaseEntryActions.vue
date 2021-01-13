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
      { name: 'pin', icon: BookmarkIcon },
      { name: 'edit', icon: EditIcon },
      { name: 'archive', icon: ArchiveIcon },
      { name: 'delete', icon: DeleteIcon },
      {
        name: 'share',
        icon: Share2Icon,
        goto: 'secondary',
      },
    ]

    const secondaryMenuItems = [
      { name: 'copylink', icon: BookmarkIcon },
      { name: 'twitter', icon: TwitterIcon },
      { name: 'mail', icon: MailIcon },
      { name: 'back', icon: SkipBackIcon, goto: 'primary' },
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
