<template>
  <div
    class="relative flex flex-col justify-between px-3 py-4 rounded-lg bg-secondary"
  >
    <div class="flex items-start justify-between">
      <div class="flex flex-col w-3/4 space-y-2 overflow-hidden overflow-clip">
        <span v-if="contentText" class="">{{ contentText }}</span>
        <LinkEntry
          v-if="contentType === 'Link'"
          :content-text="contentText"
          :content-url="contentUrl"
          :content-preview="contentPreview"
        />
      </div>
      <div class="flex items-center">
        <span class="text-sm">{{ timeFrom }}</span>
        <IconOnlyButton
          @mouseover="showMenu = !showMenu"
          @click="showMenu = !showMenu"
        >
          <MoreVerticalIcon size="1.25x" />
        </IconOnlyButton>
      </div>
      <Menu
        v-if="showMenu"
        :primary-items="primaryMenuItems"
        :secondary-items="secondaryMenuItems"
        class="absolute right-5 top-10"
        @mouseleave="showMenu = false"
        @click="handleMenuClick(item)"
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

<script>
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
    const showMenu = ref(false)
    const dayjs = useContext().app.$dayjs
    const primaryMenuItems = [
      { name: 'Pin', icon: BookmarkIcon },
      { name: 'Edit', icon: EditIcon },
      { name: 'Archive', icon: ArchiveIcon },
      { name: 'Remove', icon: DeleteIcon },
      {
        name: 'Share',
        icon: Share2Icon,
        goto: 'secondary',
      },
    ]

    const secondaryMenuItems = [
      { name: 'Copy Link', icon: BookmarkIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Mail', icon: MailIcon },
      { name: 'Back', icon: SkipBackIcon, goto: 'primary' },
    ]

    function handleMenuClick(item) {
      showMenu.value = false
      // TODO make stuff with item
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
