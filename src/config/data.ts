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
  RiFileListLine,
  RiListUnordered,
} from 'vue-remix-icons'
import { Filter, MenuOption, Order } from '../types'

export const sidebarItems = [
  { icon: RiDashboardLine, text: 'home' },
  { icon: RiMapPin2Line, text: 'pinned' },
  { icon: RiArchiveLine, text: 'archive' },
]

export const hoverSecondaryMenu = [
  { name: 'copylink', icon: RiLink, translate: true },
  { name: 'twitter', icon: RiTwitterLine, translate: true },
  { name: 'mail', icon: RiMailLine, translate: true },
  { name: 'back', icon: RiDeleteBack2Line, goto: 'primary', translate: true },
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
  { text: Order.CALENDER_DESC, info: 'DEFAULT', translate: true },
  { text: Order.CALENDER_ASC, translate: true },
  { text: Order.TITLE_DESC, translate: true },
  { text: Order.TITLE_ASC, translate: true },
  { text: Order.UPDATED_DESC, info: 'DEFAULT', translate: true },
  { text: Order.UPDATED_ASC, translate: true },
]

export const filterInitial: Filter = {
  preview: true,
  categories: undefined,
  date: undefined,
  order: undefined,
}
