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
    | 'dateSecondary'
    | 'list'
    | 'order'
    | 'sortBy'
    | 'reset'
  item: string | boolean
}

export enum Order {
  UPDATED_DESC = 'updatedAt_desc',
  UPDATED_ASC = 'updatedAt_asc',
  TITLE_DESC = 'title_desc',
  TITLE_ASC = 'title_asc',
  CALENDER_DESC = 'calendarDate_desc',
  CALENDER_ASC = 'calendarDate_asc',
}

export type Filter = {
  categories?: string | undefined
  preview?: boolean | undefined
  date?: string | undefined
  list?: string | undefined
  sortBy?: 'title' | 'updatedAt' | 'calendarDate'
  order?: Order
}

export type HeaderInputType = 'list' | 'entry' | 'search'

export type MenuOptionItem = {
  icon: any
  text: string
  info?: string
  translate?: boolean
}
export type MenuOption = Array<MenuOptionItem>

export type HoverMenuItem = {
  name: string
  icon: any
  goto?: string
  info?: string
}

export type Error = { show: boolean; msg: string }
