import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getUsersList,
  deleteUserById,
  userLogin,
  createNewUser,
  sendOTPToUser
} from '../service/UserService'
import { NAVACTIONS } from '../const/const'
import { useRouter } from 'vue-router'


export const useUserStore = defineStore('UserStore', () => {
  const router = useRouter()
  const navRoutes = ref()
  const userList = ref()
  const userData = ref({
    id: null,
    userName: null,
    contact: null
  })
  const isLoggedIn = ref(false)

  const getUserLists = async () => {
    userList.value = await getUsersList()
    return userList.value
  }

  const userLists = () => {
    return userList.value
  }
  
  const getNavigationList = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.userType === 'admin') {
        navRoutes.value = NAVACTIONS.filter((route) => route.user === 'admin')
      } else {
        navRoutes.value = NAVACTIONS.filter((route) => route.user === 'user')
      }
      navRoutes.value.push(...NAVACTIONS.filter((route) => route.user === 'common'))
    } else {
      router.push('/login')

    }
    return navRoutes.value
  }

  const saveUser = async (userData) => {
    return await createNewUser(userData)
  }
  const deleteUser = async (id) => {
    return await deleteUserById(id)
  }

  const login = async (username, password) => {
    try {
      const response = await userLogin(username, password)
      if (response) {
        isLoggedIn.value = true
        setUserData(response)
        response.userType = response.user_name === 'admin' ? 'admin' : 'user'
        localStorage.setItem('user', JSON.stringify(response))
      }
      return
    } catch (error) {
      throw new Error('Error at user login')
    }
  }

  const logOut = async () => {
    isLoggedIn.value = false
    localStorage.removeItem('user')
    userData.value = {
      id: null,
      userName: null,
      contact: null
    }
  }

  const setUserData = async (param) => {
    userData.value.id = param.id
    userData.value.userName = param.user_name
    userData.value.contact = param.contact
  }

  const sendOTP = async (param) => {
    const requestData = {
      userName: userData.value.userName,
      conatct: userData.value.contact,
      newPassword: param.newPassword
    }
    try {
      return await sendOTPToUser(requestData)
    } catch (error) {
      throw new Error('Error at OTP generation')
    }
  }

  const isLoggedUser = computed(() => isLoggedIn.value)

  return {
    login,
    isLoggedUser,
    logOut,
    saveUser,
    setUserData,
    sendOTP,
    getUserLists,
    getNavigationList
  }
})
