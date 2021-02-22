<template>
  <BaseActions
    :primary-menu="primaryMenu"
    :secondary-menu="hoverSecondaryMenu"
    @edit="submit"
    @remove="remove"
    @pin="pin"
    @archive="archive"
    @share="share"
  >
    <FormInput
      v-model:value="edited.title"
      label="Title"
      type="text"
      :placeholder="list.title"
    />
    <FormInput
      v-model:valuel="edited.description"
      label="Description"
      type="text"
      :placeholder="list.description"
    />
    <FormInput
      v-model:value="categories"
      label="Categories"
      type="text"
      :placeholder="list.categories ? list.categories.join(' ') : ''"
    />
  </BaseActions>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'

import { EditedList } from '@/types'
import { List } from '@/generated/graphql'

import { hoverSecondaryMenu } from '@/config/data'

import { isEmpty } from 'lodash'
import { removeList, updateList } from '@/db/list'
import { getDb } from '@/db/Database'
import { usePrimaryMenu } from '@/hooks'
import { decryptDataKey } from '@/utils/crypto'

export default defineComponent({
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Object as PropType<List>,
      default: () => {},
    },
  },
  setup(props) {
    const db = getDb()
    const edited = ref<EditedList>({})
    const showModal = ref(false)
    const { primaryMenu } = usePrimaryMenu(toRefs(props).list, 'lists')

    const categories = computed({
      get: () => edited.value.categories,
      set: (val) => {
        edited.value.categories = val
      },
    })

    function remove() {
      removeList(props.list.id, db)
    }

    async function pin(value: boolean) {
      await updateList(props.list.id, { pinned: value }, db)
    }
    async function archive(value: boolean) {
      console.log('archive ~ value', value)
      await updateList(props.list.id, { archived: value }, db)
    }

    async function share(value: string) {
      const key = decryptDataKey(props.list.hashedKey)

      const entries = await db.entries
        .find({ selector: { id: { $in: props.list.entries } } })
        .exec()
      const keys = entries.map((e) => decryptDataKey(e.hashedKey))

      const el = document.createElement('textarea')
      el.value = `http://projectm.localhost/shared/${props.list.id}?code=${key}&target=list&keys=${keys}`
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
    }

    function submit() {
      if (!isEmpty(edited.value)) updateList(props.list.id, edited.value, db)
      edited.value = {}
      showModal.value = false
    }

    return {
      showModal,
      primaryMenu,
      hoverSecondaryMenu,
      categories,
      edited,
      submit,
      remove,
      pin,
      archive,
      share,
    }
  },
})
</script>
