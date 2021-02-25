<template>
  <BaseActions
    :primary-menu="primaryMenu"
    :secondary-menu="hoverSecondaryMenu"
    :validation-schema="schema"
    :notification="notification"
    @edit="submit"
    @remove="remove"
    @pin="pin"
    @archive="archive"
    @share="share"
  >
    <FormInput
      label="title"
      name="title"
      type="text"
      :placeholder="list.title"
    />
    <FormInput
      name="description"
      label="description"
      type="text"
      :placeholder="list.description"
    />
    <FormInput
      name="categories"
      label="categories"
      type="text"
      :placeholder="list.categories ? list.categories.join(' ') : ''"
    />
  </BaseActions>
</template>

<script setup lang="ts">
import { ref, toRefs, defineProps } from 'vue'
import { object, string } from 'yup'

import type { List } from '@/generated/graphql'

import { hoverSecondaryMenu } from '@/config/data'

import { removeList, updateList } from '@/db/list'
import { getDb } from '@/db/Database'
import { useNotification, usePrimaryMenu } from '@/hooks'
import { decryptDataKey } from '@/utils/crypto'
import { shareLink } from '@/utils/share'

const props = defineProps<{ shwoMenu: boolean; list: List }>()

const db = getDb()
const showModal = ref(false)
const { primaryMenu } = usePrimaryMenu(toRefs(props).list, 'lists')
const { notification, setNotification } = useNotification()

const schema = object().shape({
  title: string().min(3).nullable(),
  description: string().min(3).nullable(),
  categories: string().min(3).nullable(),
})

function remove() {
  removeList(props.list.id, db)
}

async function pin(value: boolean) {
  await updateList(props.list.id, { pinned: value }, db)
}
async function archive(value: boolean) {
  await updateList(props.list.id, { archived: value }, db)
}

async function share() {
  const key = decryptDataKey(props.list.hashedKey)

  const entries = await db.entries
    .find({ selector: { id: { $in: props.list.entries } } })
    .exec()
  const keys = entries.map((e) => decryptDataKey(e.hashedKey))
  shareLink(props.list.id, key, 'list', keys)
  setNotification({ show: true, type: 'success', text: 'shareSuccess' })
}

async function submit(values: {
  title?: string
  description?: string
  categories?: string
}) {
  if (Object.values(values).some((x) => x !== undefined))
    await updateList(props.list.id, values, db)
  showModal.value = false
}
</script>
