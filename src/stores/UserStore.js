import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getUsersList,
  deleteUserById,
  adminLogIn,
  userLogIn,
  createNewUser,
  sendOTPToUser, verifySentOtp, changeUserPassword, updateExistingUser
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
        router.push('/dashboard')
      } else {
        navRoutes.value = NAVACTIONS.filter((route) => route.user === 'user')
        router.push('/')
      }
      navRoutes.value.push(...NAVACTIONS.filter((route) => route.user === 'common'))
    } else {
      router.push('/login')
    }
    return navRoutes.value
  }

  const saveUser = async (userData) => {
    userData.adminId = loggedUser.value.id
    userData.userName = userData.userName.toLowerCase()
    return await createNewUser(userData)
  }

  const updateUser = async (userData) => {    
    userData.adminId = loggedUser.value.id
    userData.userName = userData.userName.toLowerCase()
    return await updateExistingUser(userData)
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
        response.districtList = response.district_details.map(detail => detail.district_id);
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
  }

  const sendOTP = async (contact, userName) => {
    try {
      return await sendOTPToUser(contact, userName)
    } catch (error) {
      throw new Error('Error at OTP generation')
    }
  }

  const verifyOtp = async (otpNumber, contact, userName) => {
    try {
      return await verifySentOtp(otpNumber, contact, userName)
    } catch (error) {
      throw new Error('Error at OTP generation')
    }
  }

  const changePassword = async (password, contact, userName) => {
    try {
      return await changeUserPassword(password, contact, userName)
    } catch (error) {
      throw new Error('Error at password change')
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
    getLoggedUser,
    changePassword,
    updateUser
  }
})
