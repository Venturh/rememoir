<template>
  <div class="absolute z-50 top-10 right-5">
    <Modal
      v-if="showModal"
      v-model="showModal"
      form
      @confirm="submitEditedList"
      @cancel="showModal = false"
    >
      <template v-slot:title>Edit list</template>
      <FormInput
        v-model="editedList.title"
        label="Title"
        type="text"
        :placeholder="list.title"
      />
      <FormInput
        v-model="editedList.description"
        label="Text"
        type="text"
        :placeholder="list.description"
      >
        Url
      </FormInput>
      <FormInput
        v-model="categories"
        label="Text"
        type="text"
        :placeholder="list.categories ? list.categories.join(' ') : ''"
      >
        Categories
      </FormInput>
    </Modal>
    <Menu
      v-if="showMenu"
      :primary-items="primaryMenuItems"
      :secondary-items="secondaryMenuItems"
      @mouseleave="$emit('hideMenu', true)"
      @click="handleMenu"
    />
  </div>
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

import {
  hoverPrimaryMenuItems as primaryMenuItems,
  hoverSecondaryMenuItems as secondaryMenuItems,
} from '@/config/data'

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
  setup(props, { emit }) {
    const { $db } = useContext().app
    const editedList = ref<EditedList>({})
    const showModal = ref(false)

    const categories = computed({
      get: () => editedList.value.categories,
      set: (val) => {
        editedList.value.categories = val
      },
    })

    function handleMenu({ name, info }: { name: string; info: string }) {
      switch (name) {
        case 'delete':
          removeList(props.list.id, $db)
          break
        case 'edit':
          emit('showMenu', false)
          showModal.value = true
          break

        default:
          break
      }
      emit('showMenu', false)
    }

    function submitEditedList() {
      console.log('editedList.value', editedList.value)

      if (!isEmpty(editedList.value))
        updateList(props.list.id, editedList.value, $db)
      editedList.value = {}

      showModal.value = false
    }

    return {
      showModal,
      primaryMenuItems,
      secondaryMenuItems,
      handleMenu,
      categories,
      editedList,
      submitEditedList,
    }
  },
})
</script>
