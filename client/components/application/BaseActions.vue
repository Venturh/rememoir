<template>
  <div class="flex items-center">
    <button @mouseover="showMenu = !showMenu" @click="showMenu = !showMenu">
      <MoreVerticalIcon size="1.25x" />
    </button>
    <div class="absolute z-50 top-10 right-5">
      <Modal
        v-if="showEditModal"
        v-model="showEditModal"
        form
        @confirm="submitModal"
        @cancel="showEditModal = false"
      >
        <template v-slot:title>Edit Entry</template>
        <slot />
      </Modal>
      <Menu
        v-if="showMenu"
        :primary-items="primaryMenu"
        :secondary-items="secondaryMenu"
        @mouseleave="$emit('hideMenu', true)"
        @click="handleMenu"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'

import { MoreVerticalIcon } from 'vue-feather-icons'

type Type = 'entry' | 'list'
export default defineComponent({
  components: {
    MoreVerticalIcon,
  },
  props: {
    type: {
      type: String as PropType<Type>,
      default: '',
    },
    primaryMenu: {
      type: Array,
      default: () => [],
    },
    secondaryMenu: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const showMenu = ref(false)
    const showEditModal = ref(false)
    const showLists = ref(false)

    const entryTarget = computed(() => props.type === 'entry')

    function handleMenu({ name, info }: { name: string; info: string }) {
      switch (name) {
        case 'delete':
          emit('remove')
          break
        case 'edit':
          showEditModal.value = true
          break
        case 'addToList':
          showLists.value = true
          emit('showLists')
          return
        case 'share':
          return
        case 'back':
          showLists.value = false
          return
        case 'pin':
          break
        case 'archive':
          break

        default:
          break
      }
      if (info) {
        emit('addToList', info)
      }

      emit('showMenu', false)
    }

    function submitModal() {
      showEditModal.value = false
      emit('edit')
    }

    return {
      showMenu,
      showEditModal,
      handleMenu,
      submitModal,
      entryTarget,
    }
  },
})
</script>
