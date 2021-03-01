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
  RiBankCard2Line,
  RiSettings2Line,
  RiAccountBoxLine,
} from 'vue-remix-icons'
import { Filter, MenuOption, Order } from '../types'

export const sidebarItems = [
  { icon: RiDashboardLine, text: 'home', info: '/home' },
  { icon: RiMapPin2Line, text: 'pinned', info: '/pinned' },
  { icon: RiArchiveLine, text: 'archive', info: '/archive' },
]
export const settingsItems = [
  {
    icon: RiSettings2Line,
    text: 'general',
    translate: true,
    info: '/settings/general',
  },
  {
    icon: RiAccountBoxLine,
    text: 'account',
    translate: true,
    info: '/settings/account',
  },
  {
    icon: RiBankCard2Line,
    text: 'payment',
    translate: true,
    info: '/settings/payment',
  },
]

export const hoverSecondaryMenu = [
  { text: 'copylink', icon: RiLink, translate: true },
  { text: 'twitter', icon: RiTwitterLine, translate: true },
  { text: 'mail', icon: RiMailLine, translate: true },
  { text: 'back', icon: RiDeleteBack2Line, goto: 'primary', translate: true },
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
  { icon: null, text: 'today', info: dayjs(), translate: true },
  {
    icon: null,
    text: 'pastWeek',
    info: dayjs().subtract(1, 'week'),
    translate: true,
  },
  {
    icon: null,
    text: 'pastMonth',
    info: dayjs().subtract(1, 'month'),
    translate: true,
  },
  {
    icon: null,
    text: 'pastYear',
    info: dayjs().subtract(1, 'year'),
    translate: true,
  },
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
  customDate: undefined,
}
