export type EditedEntry = {
  contentText?: string
  contentUrl?: string
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

export type HeaderInputType = 'list' | 'entry'

export type MenuOptionItem = { icon: any; text: string }
export type MenuOption = Array<MenuOptionItem>
