import dayjs from 'dayjs'
import { Filter, MenuOption, Order } from '../types'

export const sidebarItems = [
  { icon: 'home', text: 'home' },
  { icon: 'map-marker', text: 'pinned' },
  { icon: 'archive', text: 'archive' },
]

export const tabnavItems = [
  { icon: '', text: 'entries' },
  { icon: '', text: 'lists' },
]

export const hoverListPrimaryMenu = [
  { name: 'pin', icon: 'map-marker' },
  { name: 'edit', icon: 'edit' },
  { name: 'archive', icon: 'archive' },
  { name: 'delete', icon: 'backspace' },
  {
    name: 'share',
    icon: 'share-alt',
    goto: 'secondary',
  },
]

export const hoverEntryPrimaryMenu = [
  { name: 'addToList', icon: 'plus', goto: 'secondary' },
  { name: 'pin', icon: 'map-marker' },
  { name: 'edit', icon: 'edit' },
  { name: 'archive', icon: 'archive' },
  { name: 'delete', icon: 'backspace' },
  {
    name: 'share',
    icon: 'share-alt',
    goto: 'secondary',
  },
]

export const hoverSecondaryMenu = [
  { name: 'copylink', icon: 'link' },
  { name: 'twitter', icon: 'link' },
  { name: 'mail', icon: 'link' },
  { name: 'back', icon: 'backspace', goto: 'primary' },
]

export const categories: MenuOption = [
  { icon: '', text: 'Videos' },
  { icon: '', text: 'Youtube' },
  { icon: '', text: 'Audio' },
  { icon: '', text: 'Link' },
]
export const shared = [
  { icon: '', text: 'Shared' },
  { icon: '', text: 'Unshared' },
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
  { icon: '', text: 'all_time', info: 'DEFAULT', translate: true },
  { icon: '', text: 'Today', info: dayjs() },
  { icon: '', text: 'Yesterday', info: dayjs().subtract(1, 'day') },
  { icon: '', text: 'This past week', info: dayjs().subtract(1, 'week') },
  { icon: '', text: 'This past month', info: dayjs().subtract(1, 'month') },
  { icon: '', text: 'This past year', info: dayjs().subtract(1, 'year') },
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
