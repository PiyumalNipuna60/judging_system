import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getUsersList,
  deleteUserById,
  adminLogIn,
  userLogIn,
  createNewUser,
  sendOTPToUser
} from '../service/UserService'
import { NAVACTIONS } from '../const/const'
import { useRouter } from 'vue-router'


export const useUserStore = defineStore('UserStore', () => {
  const router = useRouter()
  const navRoutes = ref()
  const userList = ref()
  const loggedUser = ref({})
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
    loggedUser.value = JSON.parse(localStorage.getItem('user'))
    if (loggedUser.value) {
      if (loggedUser.value.userType === 'admin') {
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
    userData.adminId = loggedUser.value.id
    userData.user_name = userData.userName
    return await createNewUser(userData)
  }
  const deleteUser = async (id) => {    
    return await deleteUserById(id)
  }

  const adminLogin = async (username, password) => {
    try {
      const response = await adminLogIn(username, password)
      if (response) {
        isLoggedIn.value = true
        setUserData(response)
        response.userType = 'admin'
        localStorage.setItem('user', JSON.stringify(response))
      }
      return
    } catch (error) {
      throw new Error('Error at user login')
    }
  }

  const userLogin = async (username, password) => {
    try {
      const response = await userLogIn(username, password)
      if (response) {
        isLoggedIn.value = true
        setUserData(response)
        response.userType = 'user'
        response.districtDetails = [1,2,3]
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
    console.log('log sttore otp send _______',userData.value.contact ? true : false, userData.value.contact, param);
    
    const contact = userData.value.contact ? userData.value.contact : param
    try {
      return await sendOTPToUser(contact)
    } catch (error) {
      throw new Error('Error at OTP generation')
    }
  }

  const verifyOtp = async (param) => {
    console.log('log sttore otp send _______',userData.value.contact ? true : false, userData.value.contact, param);
    const request = {
      otp: param,
      contact: userData.value.contact
    }
    try {
      return await sendOTPToUser(request)
    } catch (error) {
      throw new Error('Error at OTP generation')
    }
  }

  const isLoggedUser = computed(() => isLoggedIn.value)
  const getLoggedUser = computed(() => loggedUser.value)

  return {
    userLogin,
    adminLogin,
    isLoggedUser,
    logOut,
    saveUser,
    setUserData,
    sendOTP,
    verifyOtp,
    getUserLists,
    getNavigationList,
    userLists,
    deleteUser,
    getLoggedUser
  }
})
