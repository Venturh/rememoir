<template>
  <div class="flex items-center">
    <IconOnlyButton variant="primary" @click.stop="showMenu = !showMenu">
      <Icon :icon="RiMore2Line" />
    </IconOnlyButton>
    <div class="absolute z-50 top-10 right-5">
      <Modal
        v-if="showEditModal"
        v-model="showEditModal"
        form
        @confirm="submitModal"
        @cancel="showEditModal = false"
      >
        <template #title>Edit Entry</template>
        <slot />
      </Modal>
      <Menu
        v-if="showMenu"
        :primary-items="primaryMenu"
        :secondary-items="secondaryMenu"
        @mouseleave="showMenu = false"
        @click="handleMenu"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { RiMore2Line } from 'vue-remix-icons'

type Type = 'entry' | 'list'

export default defineComponent({
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
  emits: ['remove', 'showLists', 'back', 'pin', 'addToList', 'edit', 'archive'],
  setup(props, { emit }) {
    const showMenu = ref(false)
    const showEditModal = ref(false)

    function handleMenu({ name, info }: { name: string; info: string }) {
      switch (name) {
        case 'delete':
          emit('remove')
          break
        case 'edit':
          showEditModal.value = true
          break
        case 'addToList':
          emit('showLists')
          return
        case 'share':
          emit('back')
          return
        case 'back':
          emit('back')
          return
        case 'pin':
          emit('pin', true)
          break
        case 'unpin':
          emit('pin', false)
          break
        case 'archive':
          emit('archive', true)
          break
        case 'unarchive':
          emit('archive', false)
          break

        default:
          break
      }
      if (info) {
        emit('addToList', info)
      }
      showMenu.value = false
    }

    function submitModal() {
      showEditModal.value = false
      emit('edit')
    }

    return {
      RiMore2Line,
      showMenu,
      showEditModal,
      handleMenu,
      submitModal,
    }
  },
})
</script>
