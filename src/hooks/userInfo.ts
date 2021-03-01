import { ref } from 'vue'

type UserInfo = {
  email: string
  uid: string
  username: string
}

export default function useUserInfo() {
  const info = localStorage.getItem('user')
  const userInfo = ref<UserInfo | null>(info ? JSON.parse(info) : null)

  function setUserInfo(info: UserInfo) {
    localStorage.setItem('user', JSON.stringify(info))
  }
  function removeUserInfo() {
    localStorage.removeItem('user')
    userInfo.value = null
  }

  return { userInfo, setUserInfo, removeUserInfo }
}
