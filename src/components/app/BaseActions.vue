<template>
  <div class="flex items-center">
    <IconOnlyButton variant="primary" @click="showMenu = !showMenu">
      <font-awesome-icon icon="ellipsis-v" />
    </IconOnlyButton>
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
        @mouseleave="showMenu = false"
        @click="handleMenu"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

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
  setup(props, { emit }) {
    const showMenu = ref(false)
    const showEditModal = ref(false)
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
          emit('showLists')
          return
        case 'share':
          emit('back')
          return
        case 'back':
          emit('back')
          return
        case 'pin':
          emit('pin')
          break
        case 'archive':
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
      showMenu,
      showEditModal,
      handleMenu,
      submitModal,
      entryTarget,
    }
  },
})
</script>
