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
  const loggedUser = ref({
    id: null,
    userName: null,
    userType: null,
    districtList: null,
    stream: null
  })
  const userData = ref({
    id: null,
    userName: null,
    contact: null,
    userType: null
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
    if (isLoggedIn.value) {
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
        loggedUser.value.id = response.id
        loggedUser.value.userName = response.user_name
        loggedUser.value.userType = 'admin'
      }
      return
    } catch (error) {
      throw new Error('Error at admin login')
    }
  }

  const userLogin = async (username, password) => {
    try {
      const response = await userLogIn(username, password)
      if (response) {        
        isLoggedIn.value = true
        loggedUser.value.id = response.id
        loggedUser.value.userName = response.user_name
        loggedUser.value.stream = response.stream
        loggedUser.value.teacher_id = response.teacher_id
        loggedUser.value.userType = 'user'
        loggedUser.value.districtList = response.district_details.map(detail => detail.district_id);
      }
      return
    } catch (error) {
      throw new Error('Error at user login')
    }
  }

  const logOut = async () => {
    isLoggedIn.value = false
    userData.value = {
      id: null,
      userName: null,
      contact: null
    }

    loggedUser.value = {
      id: null,
      userName: null,
      userType: null,
      districtList: null,
      stream: null
    }
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
