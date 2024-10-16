import axios from 'axios'
import { DISTRICTS, BASEURL } from '../const/const'

export async function userLogIn(userName, password) {
  try {
    const response = await axios.post(`${BASEURL}/api/user-login`, {
      userName: userName,
      password: password
    })
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at user login')
    }
  } catch (error) {
    throw new Error('Error at user login', error)
  }
}

export async function adminLogIn(userName, password) {
  try {
    const response = await axios.post(`${BASEURL}/api/login`, {
      userName: userName,
      password: password
    })
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at admin login')
    }
  } catch (error) {
    throw new Error('Error at admin login', error)
  }
}

export async function getUsersList() {
  try {
    const response = await axios.get(`${BASEURL}/api/get_all_teacher`)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error at get user list')
    }
  } catch (error) {
    throw new Error('Error at get user list', error)
  }
}

export async function createNewUser(userData) {  
    const response = await axios.post(`${BASEURL}/api/save_teacher`, userData)
    console.log('response log ', response)
    if (response.status === 200) {
      return true
    } else {
      throw new Error('Error at creating user')
    }
}

export async function updateExistingUser(userData) {  
    const response = await axios.put(`${BASEURL}/api/update_teacher/${userData.teacher_id}`, userData)
    console.log('response log ', response)
    if (response.status === 201) {
      return true
    } else {
      throw new Error('Error at updating user')
    }
}

export async function deleteUserById(id) {
  try {
    const response = await axios.delete(`${BASEURL}/api/delete_teacher/${id}`)    
    if (response.status === 200) {
      return true
    } else {
      throw new Error('Error at delete user')
    }
  } catch (error) {
    throw new Error('Error at delete user', error)
  }
}

export async function sendOTPToUser(contact, userName) {
  const request = {
    contact: contact,
    userName: userName
  }
  try {
    const response = await axios.post(`${BASEURL}/api/send_otp`, request)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at otp send', response.status)
    }
  } catch (error) {
    throw new Error('Error at otp send', error)
  }
}

export async function verifySentOtp(otpNumber, contact, userName) {
  const request = {
    otp: otpNumber,
    contact: contact,
    userName: userName
  }
  try {
    const response = await axios.post(`${BASEURL}/api/verify_otp`, request)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at otp verification')
    }
  } catch (error) {
    throw new Error('Error at otp verification', error)
  }
}

export async function changeUserPassword(password, contact, userName) {  
  const request = {
    password: password,
    contact: contact,
    userName: userName
  }
  try {
    const response = await axios.post(`${BASEURL}/api/change_password`, request)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at password change')
    }
  } catch (error) {
    throw new Error('Error at  password change', error)
  }}