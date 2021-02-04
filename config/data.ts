import dayjs from 'dayjs'
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
  ArrowUpIcon,
  ArrowDownIcon,
  ColumnsIcon,
  ListIcon,
} from 'vue-feather-icons'
import { Filter } from '../types'

export const sidebarItems = [
  { icon: HomeIcon, text: 'home' },
  { icon: HeartIcon, text: 'pinned' },
  { icon: ArchiveIcon, text: 'archive' },
]

export const tabnavItems = [
  { icon: ColumnsIcon, text: 'entries' },
  { icon: ListIcon, text: 'lists' },
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
  { icon: null, text: 'All', info: 'DEFAULT' },
  { icon: null, text: 'Videos' },
  { icon: null, text: 'Youtube' },
  { icon: null, text: 'Audio' },
  { icon: null, text: 'Link' },
]
export const shared = [
  { icon: null, text: 'Shared' },
  { icon: null, text: 'Unshared' },
]

export const calendarTheme = {
  background: 'var(--bg-secondary)',
  text: 'text-primary',
  border: 'border-borderPrimary',
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

export const time = [
  { icon: null, text: 'All Time', info: 'DEFAULT' },
  { icon: null, text: 'Today', info: dayjs() },
  { icon: null, text: 'Yesterday', info: dayjs().subtract(1, 'day') },
  { icon: null, text: 'This past week', info: dayjs().subtract(1, 'week') },
  { icon: null, text: 'This past month', info: dayjs().subtract(1, 'month') },
  { icon: null, text: 'This past year', info: dayjs().subtract(1, 'year') },
]

export const order = [
  { icon: ArrowDownIcon, text: 'Desc', info: 'desc' },
  { icon: ArrowUpIcon, text: 'Asc', info: 'asc' },
]

export const filterInitial: Filter = {
  preview: true,
  categories: undefined,
  date: undefined,
  list: undefined,
  order: 'desc',
  sortBy: 'updatedAt',
}
