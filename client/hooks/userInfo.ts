type UserInfo = {
  email: string
  uid: string
  name: string
}

export default function useUserUnfo() {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('user'))

  function setUserInfo(info: UserInfo) {
    localStorage.setItem('user', JSON.stringify(info))
  }

  return { userInfo, setUserInfo }
}
