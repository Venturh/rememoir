import {
  BookmarkIcon,
  EditIcon,
  ArchiveIcon,
  DeleteIcon,
  Share2Icon,
  TwitterIcon,
  MailIcon,
  SkipBackIcon,
  ColumnsIcon,
  HeartIcon,
  ListIcon,
} from 'vue-feather-icons'

export const sidebarItems = [
  { index: 0, icon: ColumnsIcon, name: 'entries' },
  { index: 1, icon: ListIcon, name: 'lists' },
  { index: 2, icon: HeartIcon, name: 'pinned' },
  { index: 3, icon: ArchiveIcon, name: 'archive' },
]

export const hoverPrimaryMenuItems = [
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

export const hoverSecondaryMenuItems = [
  { name: 'copylink', icon: BookmarkIcon },
  { name: 'twitter', icon: TwitterIcon },
  { name: 'mail', icon: MailIcon },
  { name: 'back', icon: SkipBackIcon, goto: 'primary' },
]

export const categories = [
  'All',
  'Videos',
  'Audio',
  'Youtube',
  'Website',
  'Link',
]
