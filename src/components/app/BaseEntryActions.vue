<template>
  <BaseActions
    :primary-menu="primaryMenu"
    :secondary-menu="secondaryItems"
    :validation-schema="schema"
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
      label="title"
      name="title"
      type="text"
      :placeholder="entry.title"
    />
    <FormInput
      name="description"
      label="description"
      type="text"
      :placeholder="entry.description"
    />
    <FormInput name="url" label="url" type="text" :placeholder="entry.url" />
    <FormInput
      name="categories"
      label="categories"
      type="text"
      :placeholder="entry.categories ? entry.categories.join(' ') : ''"
    />
  </BaseActions>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, defineProps } from 'vue'
import { RiDeleteBack2Line, RiLayoutColumnLine } from 'vue-remix-icons'

import { object, string } from 'yup'

import { hoverSecondaryMenu } from '@/config/data'
import { removeEntry, update } from '@/db/entry'
import { useAvaibleLists, usePrimaryMenu } from '@/hooks'
import { addEntryToList } from '@/db/list'
import { getDb } from '@/db/Database'

import type { MenuOption } from '@/types'
import type { EntryInput } from '@/generated/graphql'
import { decryptDataKey } from '@/utils/crypto'
import { shareLink } from '@/utils/share'

const props = defineProps<{
  showMenu: false
  entry: EntryInput
  isListEntry: boolean
}>()

const db = getDb()
const showEditModal = ref(false)
const showLists = ref(false)
const { avaibleLists } = useAvaibleLists(db, props.entry.id)
const { primaryMenu } = usePrimaryMenu(toRefs(props).entry, 'entries')

const schema = object().shape({
  title: string().min(3).nullable(),
  description: string().min(3).nullable(),
  url: string().min(3).nullable(),
  categories: string().min(3).nullable(),
})

const secondaryItems = computed(() => {
  const listItems: MenuOption = avaibleLists.value.map((l) => {
    return { text: l.text, icon: RiLayoutColumnLine, info: l.info }
  })
  listItems.unshift({
    text: 'back',
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
  await update(props.entry.id, { archived: value }, db)
}

async function share() {
  const key = decryptDataKey(props.entry.hashedKey)
  shareLink(props.entry.id, key, 'entry')
}

async function submit(values: {
  title?: string
  description?: string
  url?: string
  categories?: string
}) {
  if (Object.values(values).some((x) => x !== undefined))
    await update(props.entry.id, values, db)

  showEditModal.value = false
}
</script>
