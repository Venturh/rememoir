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
        name="baseactions"
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

<script setup lang="ts">
import { ref, defineEmit, defineProps } from 'vue'
import { RiMore2Line } from 'vue-remix-icons'

defineProps<{
  type: any
  primaryMenu: []
  secondaryMenu: []
}>()

const emit = defineEmit([
  'remove',
  'showLists',
  'back',
  'pin',
  'addToList',
  'edit',
  'archive',
])

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
</script>
