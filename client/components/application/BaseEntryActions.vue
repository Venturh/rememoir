<template>
  <div>
    <Modal
      v-model="showModal"
      @confirm="handleModal"
      @cancel="showModal = false"
    >
      <template v-slot:title>Hello, vue-final-modal</template>
      <p>
        Vue Final Modal is a renderless, stackable, detachable and lightweight
        modal component.
      </p>
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
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
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
import { remove } from '@/db/entry'

export default defineComponent({
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { $db } = useContext().app
    const showModal = ref(false)
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
      console.log('handleMenuClick ~ item', itemName)
      switch (itemName) {
        case 'delete':
          remove(props.id, $db)
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

    function handleModal() {
      console.log('handleModal')
      emit('showModal', false)
    }
    return {
      showModal,
      primaryMenuItems,
      secondaryMenuItems,
      handleMenu,
      handleModal,
    }
  },
})
</script>
