export type EditedEntry = {
  contentText?: string
  contentUrl?: string
  categories?: string
}

export type Filters = {
  type: 'categories' | 'preview'
  item: string | boolean
}
