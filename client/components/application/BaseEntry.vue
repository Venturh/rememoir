<template>
  <div
    class="relative flex flex-col justify-between w-screen px-3 py-4 rounded-lg bg-secondary"
  >
    <div class="flex items-start justify-between">
      <div class="space-y-2">
        <span v-if="contentText" class="">{{ contentText }}</span>
        <LinkEntry
          v-if="contentType === 'Link'"
          :content-text="contentText"
          :content-url="contentUrl"
          :content-preview="contentPreview"
        />
      </div>
      <div class="flex items-center flex-shrink-0">
        <span class="text-sm">{{ timeFrom }}</span>
        <button @mouseover="showMenu = !showMenu" @click="showMenu = !showMenu">
          <MoreVerticalIcon size="1.25x" />
        </button>
      </div>
      <Menu
        v-if="showMenu"
        :primary-items="primaryMenuItems"
        :secondary-items="secondaryMenuItems"
        class="absolute right-5 top-10"
        @mouseleave="showMenu = false"
        @click="handleMenuClick"
      />
    </div>

    <div class="flex items-center justify-between">
      <span />
      <div class="space-x-2">
        <span
          v-for="category in categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
        >
          {{ category }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import {
  MoreVerticalIcon,
  BookmarkIcon,
  EditIcon,
  ArchiveIcon,
  DeleteIcon,
  Share2Icon,
  TwitterIcon,
  MailIcon,
  SkipBackIcon,
} from 'vue-feather-icons'

import { remove } from '@/db/entry'

export default defineComponent({
  components: {
    MoreVerticalIcon,
    BookmarkIcon,
    EditIcon,
    ArchiveIcon,
    DeleteIcon,
    Share2Icon,
    TwitterIcon,
    MailIcon,
    SkipBackIcon,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    contentText: {
      type: String,
      default: '',
    },
    contentUrl: {
      type: String,
      default: '',
    },
    contentType: {
      type: String,
      default: '',
    },
    contentPreview: {
      type: Object,
      default: () => {},
    },
    processing: {
      type: Boolean,
      default: false,
    },
    updatedAt: {
      type: String,
      default: '',
    },
    hashedKey: {
      type: String,
      default: '',
    },
    calendarDate: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { $db } = useContext().app
    const showMenu = ref(false)
    const dayjs = useContext().app.$dayjs
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

    function handleMenuClick(itemName: string) {
      console.log('handleMenuClick ~ item', itemName)
      switch (itemName) {
        case 'delete':
          remove(props.id, $db)
          break

        default:
          break
      }
      showMenu.value = false
    }
    const timeFrom = computed(() => {
      return dayjs(parseInt(props.updatedAt)).fromNow()
    })

    return {
      showMenu,
      handleMenuClick,
      primaryMenuItems,
      secondaryMenuItems,
      timeFrom,
    }
  },
})
</script>
