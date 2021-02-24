<template>
  <div class="space-y-2">
    <label class="flex items-center justify-between" :for="name">
      <span>{{ label ? t(label.toString()) : '' }}</span>
      <div v-if="errorMessage" class="flex items-center space-x-2 text-error">
        <Icon :icon="RiErrorWarningLine" size="sm" />
        <p>
          {{ t(`${errorMessage?.key}`) }}
          <span v-show="errorMessage?.values !== undefined">
            {{ errorMessage?.values }}
          </span>
        </p>
      </div>

      <div
        v-if="successMessage && meta.valid"
        class="flex items-center space-x-2 text-success"
      >
        <Icon :icon="RiCheckboxCircleLine" size="sm" />
        <p>
          {{ t(`${successMessage}`) }}
        </p>
      </div>
    </label>
    <input
      :id="name"
      class="block w-full border rounded-md bg-primary border-borderPrimary hover:ring-primaryText focus:ring-brand focus:border-brand sm:text-sm"
      :name="name"
      :type="type"
      :value="inputValue"
      autocomplete="off"
      :placeholder="placeholder"
      v-on="validationListeners"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useField } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { RiCheckboxCircleLine, RiErrorWarningLine } from 'vue-remix-icons'

const props = defineProps<{
  name: string
  inputValue?: string
  type: string
  label?: string
  placeholder?: string
  successMessage?: string
}>()

const { t } = useI18n()
const {
  value: inputValue,
  errorMessage,
  handleInput,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  validateOnValueUpdate: false,
})

const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      input: handleInput,
    }
  }

  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange,
  }
})
</script>
