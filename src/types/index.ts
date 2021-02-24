export type Edited = {
  title?: string
  description?: string
  url?: string
  categories?: string
  pinned?: boolean
  archived?: boolean
}

export type Filters = {
  type:
    | 'categories'
    | 'preview'
    | 'date'
    | 'dateSecondary'
    | 'list'
    | 'order'
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
  order?: Order
  cursor?: string
}

export type HeaderInputType = 'list' | 'entry' | 'search'

export type MenuOptionItem = {
  text: string
  icon: any
  info?: string
  translate?: boolean
  goto?: string
}
export type MenuOption = Array<MenuOptionItem>

export type Error = { show: boolean; msg: string }

export type LayoutTarget = 'pinned' | 'archive' | 'undefined'
