import { Entry, List } from '../entities'

export function sortByUpdated(toSort: List[] | Entry[]) {
  return toSort.sort((a: Entry | List, b: Entry | List) => {
    if (a.updatedAt > b.updatedAt) return 1
    if (a.updatedAt < b.updatedAt) return -1
    if (a.updatedAt === b.updatedAt) {
      if (a.id > b.id) return 1
      if (a.id < b.id) return -1
      else return 0
    } else return 0
  })
}

export function filterEntry(
  sorted: Entry[],
  minUpdatedAt: number,
  lastId: string
) {
  return sorted.filter((doc) => {
    if (doc.updatedAt < minUpdatedAt) return false
    if (doc.updatedAt > minUpdatedAt) return true
    if (doc.updatedAt === minUpdatedAt) {
      if (doc.id > lastId) return true
      else return false
    } else return false
  })
}
export function filterList(
  sorted: List[],
  minUpdatedAt: number,
  lastId: string
) {
  return sorted.filter((doc) => {
    if (doc.updatedAt < minUpdatedAt) return false
    if (doc.updatedAt > minUpdatedAt) return true
    if (doc.updatedAt === minUpdatedAt) {
      if (doc.id > lastId) return true
      else return false
    } else return false
  })
}
