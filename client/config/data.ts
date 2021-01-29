import {
  BookmarkIcon,
  EditIcon,
  ArchiveIcon,
  DeleteIcon,
  Share2Icon,
  TwitterIcon,
  MailIcon,
  SkipBackIcon,
  HeartIcon,
  HomeIcon,
  PlusSquareIcon,
} from 'vue-feather-icons'

export const sidebarItems = [
  { icon: HomeIcon, text: 'home' },
  { icon: HeartIcon, text: 'pinned' },
  { icon: ArchiveIcon, text: 'archive' },
]

export const hoverListPrimaryMenu = [
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

export const hoverEntryPrimaryMenu = [
  { name: 'addToList', icon: PlusSquareIcon, goto: 'secondary' },
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

export const hoverSecondaryMenu = [
  { name: 'copylink', icon: BookmarkIcon },
  { name: 'twitter', icon: TwitterIcon },
  { name: 'mail', icon: MailIcon },
  { name: 'back', icon: SkipBackIcon, goto: 'primary' },
]

export const categories = [
  { icon: null, text: 'All' },
  { icon: null, text: 'Videos' },
  { icon: null, text: 'Youtube' },
  { icon: null, text: 'Audio' },
  { icon: null, text: 'Link' },
]

export const calendarTheme = (isMobile: boolean) => {
  return {
    background: 'var(--bg-secondary)',
    text: 'text-primary',
    border: isMobile ? 'border-borderPrimary' : 'border-none',
    currentColor: 'bg-secondary',
    navigation: {
      hover: 'hover:bg-primary',
      focus: 'bg-brand25',
    },
    picker: {
      rounded: 'rounded-full',
      selected: {
        background: 'bg-brand ',
        text: 'text-brandContrast',
        border: 'border-primaryText ',
      },
    },
    event: {
      border: 'border-gray-700',
    },
  }
}

export const lists = [
  { icon: null, text: 'No List' },
  { icon: null, text: 'Test' },
  { icon: null, text: 'Liste123' },
]
