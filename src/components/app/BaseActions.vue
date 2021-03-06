<template>
  <div class="flex items-center">
    <IconOnlyButton
      variant="primary"
      rounded
      @click.stop="showMenu = !showMenu"
    >
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
        v-model="showMenu"
        :primary-items="primaryMenu"
        :secondary-items="secondaryMenu"
        @mouseleave="showMenu = false"
        @click="handleMenu"
      />
    </div>
    <Teleport to="#notification">
      <Notification :notification="notification" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmit, defineProps, Teleport } from 'vue'
import { RiMore2Line } from 'vue-remix-icons'

import type { MenuOptionItem, Notification } from '@/types'

defineProps<{
  primaryMenu: []
  secondaryMenu: []
  validationSchema?: Object
  notification?: Notification
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

function handleMenu({ text, info }: MenuOptionItem) {
  switch (text) {
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
