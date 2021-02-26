type UserInfo = {
  email: string
  uid: string
  username: string
}

export default function useUserInfo() {
  const info = localStorage.getItem('user')
  const userInfo: UserInfo | null = info
    ? JSON.parse(info)
    : { email: '', uid: '', username: '' }

  function setUserInfo(info: UserInfo) {
    localStorage.setItem('user', JSON.stringify(info))
  }

  return { userInfo, setUserInfo }
}
