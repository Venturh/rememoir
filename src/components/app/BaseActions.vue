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
        :validation-schema="validationSchema"
        @confirm="submitModal"
        @submit="submitModal"
        @cancel="showEditModal = false"
      >
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
  primaryMenu: []
  secondaryMenu: []
  validationSchema?: Object
}>()

const emit = defineEmit([
  'remove',
  'showLists',
  'back',
  'pin',
  'addToList',
  'edit',
  'archive',
  'share',
  'submit',
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
    case 'copylink':
      emit('share', 'link')
      break

    default:
      break
  }
  if (info) {
    emit('addToList', info)
  }
  showMenu.value = false
}

function submitModal(values: any) {
  showEditModal.value = false
  emit('edit', values)
}
</script>
