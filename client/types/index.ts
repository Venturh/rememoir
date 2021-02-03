export type EditedEntry = {
  title?: string
  description?: string
  url?: string
  categories?: string
}
export type EditedList = {
  title?: string
  description?: string
  categories?: string
}

export type Filters = {
  type:
    | 'categories'
    | 'preview'
    | 'date'
    | 'list'
    | 'order'
    | 'sortBy'
    | 'reset'
  item: string | boolean
}

export type Filter = {
  categories?: string | undefined
  preview?: boolean | undefined
  date?: string | undefined
  list?: string | undefined
  sortBy?: 'title' | 'updatedAt' | 'calendarDate'
  order?: 'desc' | 'asc'
}

export type HeaderInputType = 'list' | 'entry' | 'search'

export type MenuOptionItem = { icon: any; text: string; info?: string }
export type MenuOption = Array<MenuOptionItem>

export type HoverMenuItem = {
  name: string
  icon: any
  goto?: string
  info?: string
}

export type Error = { show: boolean; msg: string }
