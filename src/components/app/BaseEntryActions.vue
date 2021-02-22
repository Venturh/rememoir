<template>
  <BaseActions
    :primary-menu="primaryMenu"
    :secondary-menu="secondaryItems"
    @edit="submit"
    @remove="remove"
    @showLists="toggleLists"
    @addToList="add"
    @pin="pin"
    @archive="archive"
    @back="showLists = false"
    @share="share"
  >
    <FormInput
      v-model:value="editedEntry.title"
      label="Title"
      type="text"
      :placeholder="entry.title"
    />
    <FormInput
      v-model:value="editedEntry.description"
      label="Description"
      type="text"
      :placeholder="entry.description"
    />
    <FormInput
      v-model:value="editedEntry.url"
      label="Link"
      type="text"
      :placeholder="entry.url"
    />
    <FormInput
      v-model:value="categories"
      label="Categories"
      type="text"
      :placeholder="entry.categories ? entry.categories.join(' ') : ''"
    />
  </BaseActions>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, defineProps } from 'vue'
import { RiDeleteBack2Line, RiLayoutColumnLine } from 'vue-remix-icons'
import { isEmpty } from 'lodash'

import { hoverSecondaryMenu } from '@/config/data'
import { removeEntry, update } from '@/db/entry'
import { useAvaibleLists, usePrimaryMenu } from '@/hooks'
import { addEntryToList } from '@/db/list'
import { getDb } from '@/db/Database'

import type { EditedEntry, HoverMenuItem } from '@/types'
import type { EntryInput } from '@/generated/graphql'
import { decryptDataKey } from '@/utils/crypto'

const props = defineProps<{
  showMenu: false
  entry: EntryInput
  isListEntry: boolean
}>()

const db = getDb()
const editedEntry = ref<EditedEntry>({})
const showEditModal = ref(false)
const showLists = ref(false)
const { avaibleLists } = useAvaibleLists(db, props.entry.id)
const { primaryMenu } = usePrimaryMenu(toRefs(props).entry, 'entries')

const categories = computed({
  get: () => editedEntry.value.categories,
  set: (val) => {
    editedEntry.value.categories = val
  },
})

const secondaryItems = computed(() => {
  const listItems: HoverMenuItem[] = avaibleLists.value.map((l) => {
    return { name: l.text, icon: RiLayoutColumnLine, info: l.info }
  })
  listItems.unshift({
    name: 'back',
    icon: RiDeleteBack2Line,
    goto: 'primary',
    translate: true,
  })
  return showLists.value ? listItems : hoverSecondaryMenu
})

function toggleLists() {
  showLists.value = true
}

function remove() {
  removeEntry(props.entry.id, db, props.isListEntry)
}

function add(id: string) {
  addEntryToList(id, props.entry, db)
}

async function pin(value: boolean) {
  await update(props.entry.id, { pinned: value }, db)
}
async function archive(value: boolean) {
  console.log('archive ~ value', value)
  await update(props.entry.id, { archived: value }, db)
}

async function share(value: string) {
  console.log('share', value, props.entry.id)
  const key = decryptDataKey(props.entry.hashedKey)
  console.log('share ~ key', key)

  const el = document.createElement('textarea')
  el.value = `http://projectm.localhost/shared/${props.entry.id}?code=${key}&target=entry`
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

async function submit() {
  if (!isEmpty(editedEntry.value))
    await update(props.entry.id, editedEntry.value, db)
  editedEntry.value = {}

  showEditModal.value = false
}
</script>
