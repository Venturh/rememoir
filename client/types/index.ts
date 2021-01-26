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
  type: 'categories' | 'preview' | 'date'
  item: string | boolean
}

export type HeaderInputType = 'list' | 'entry' | 'search'

export type MenuOptionItem = { icon: any; text: string }
export type MenuOption = Array<MenuOptionItem>

export type HoverMenuItem = {
  name: string
  icon: any
  goto?: string
  info?: string
}

export type Error = { show: boolean; msg: string }
