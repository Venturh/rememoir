<template>
  <BaseActions
    :primary-menu="hoverListPrimaryMenu"
    :secondary-menu="hoverSecondaryMenu"
    @edit="submit"
    @remove="remove"
  >
    <FormInput
      v-model="edited.title"
      label="Title"
      type="text"
      :placeholder="list.title"
    />
    <FormInput
      v-model="edited.description"
      label="Description"
      type="text"
      :placeholder="list.description"
    />
    <FormInput
      v-model="categories"
      label="Categories"
      type="text"
      :placeholder="list.categories ? list.categories.join(' ') : ''"
    />
  </BaseActions>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import { EditedList } from '@/types'
import { List } from '@/generated/graphql'

import { hoverListPrimaryMenu, hoverSecondaryMenu } from '@/config/data'

import { isEmpty } from 'lodash'
import { removeList, updateList } from '@/db/list'

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
    const { $db } = useContext().app
    const edited = ref<EditedList>({})
    const showModal = ref(false)

    const categories = computed({
      get: () => edited.value.categories,
      set: (val) => {
        edited.value.categories = val
      },
    })

    function remove() {
      removeList(props.list.id, $db)
    }

    function submit() {
      if (!isEmpty(edited.value)) updateList(props.list.id, edited.value, $db)
      edited.value = {}
      showModal.value = false
    }

    return {
      showModal,
      hoverListPrimaryMenu,
      hoverSecondaryMenu,
      categories,
      edited,
      submit,
      remove,
    }
  },
})
</script>
