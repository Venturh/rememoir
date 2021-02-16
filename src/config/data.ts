import dayjs from 'dayjs'
import {
  RiDashboardLine,
  RiMapPin2Line,
  RiArchiveLine,
  RiEdit2Line,
  RiDeleteBack2Line,
  RiLink,
  RiTwitterLine,
  RiMailLine,
  RiShareLine,
  RiAddCircleLine,
} from 'vue-remix-icons'
import { Filter, MenuOption, Order } from '../types'

export const sidebarItems = [
  { icon: RiDashboardLine, text: 'home' },
  { icon: RiMapPin2Line, text: 'pinned' },
  { icon: RiArchiveLine, text: 'archive' },
]

export const tabnavItems = [
  { icon: null, text: 'entries' },
  { icon: null, text: 'lists' },
]

export const hoverListPrimaryMenu = [
  { name: 'pin', icon: RiMapPin2Line },
  { name: 'edit', icon: RiEdit2Line },
  { name: 'archive', icon: RiArchiveLine },
  { name: 'delete', icon: RiDeleteBack2Line },
  {
    name: 'share',
    icon: RiShareLine,
    goto: 'secondary',
  },
]

export const hoverEntryPrimaryMenu = [
  { name: 'addToList', icon: RiAddCircleLine, goto: 'secondary' },
  { name: 'pin', icon: RiMapPin2Line },
  { name: 'edit', icon: RiEdit2Line },
  { name: 'archive', icon: RiArchiveLine },
  { name: 'delete', icon: RiDeleteBack2Line },
  {
    name: 'share',
    icon: RiShareLine,
    goto: 'secondary',
  },
]

export const hoverSecondaryMenu = [
  { name: 'copylink', icon: RiLink },
  { name: 'twitter', icon: RiTwitterLine },
  { name: 'mail', icon: RiMailLine },
  { name: 'back', icon: RiDeleteBack2Line, goto: 'primary' },
]

export const categories: MenuOption = [
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
      text: 'text-primary',
      border: 'border-primaryText ',
    },
  },
  event: {
    border: 'border-gray-700',
  },
}

export const time = [
  { icon: null, text: 'all_time', info: 'DEFAULT', translate: true },
  { icon: null, text: 'Today', info: dayjs() },
  { icon: null, text: 'Yesterday', info: dayjs().subtract(1, 'day') },
  { icon: null, text: 'This past week', info: dayjs().subtract(1, 'week') },
  { icon: null, text: 'This past month', info: dayjs().subtract(1, 'month') },
  { icon: null, text: 'This past year', info: dayjs().subtract(1, 'year') },
]

export const order = [
  { text: Order.UPDATED_DESC, info: 'DEFAULT', translate: true },
  { text: Order.UPDATED_ASC, translate: true },
  { text: Order.TITLE_DESC, translate: true },
  { text: Order.TITLE_ASC, translate: true },
  { text: Order.CALENDER_DESC, translate: true },
  { text: Order.CALENDER_ASC, translate: true },
]

export const filterInitial: Filter = {
  preview: true,
  categories: undefined,
  date: undefined,
  order: undefined,
}
