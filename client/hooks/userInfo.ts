type UserInfo = {
  email: string
  uid: string
  username: string
}

export default function useUserInfo() {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('user'))

  function setUserInfo(info: UserInfo) {
    localStorage.setItem('user', JSON.stringify(info))
  }

  return { userInfo, setUserInfo }
}
