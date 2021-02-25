import { reactive } from 'vue'
import type { Notification } from '../types'

export function useNotification() {
  const notification = reactive<Notification>({ show: false })

  function setNotification(value: Notification) {
    Object.assign(notification, value)
    setTimeout(() => {
      notification.show = false
    }, 2000)
  }

  return { notification, setNotification }
}
