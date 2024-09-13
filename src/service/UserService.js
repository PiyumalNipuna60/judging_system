import axios from 'axios'

export async function userLogin(userName, password) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      user_name: userName,
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

export async function getUsersList() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/get_all_teacher')
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
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/save_teacher', userData)
    console.log('response log ', response)

    if (response.status === 200) {
      return true
    } else {
      throw new Error('Error at creating user')
    }
  } catch (error) {
    throw new Error('Error at creating user', error)
  }
}
export async function deleteUserById(id) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/delete_teacher/${id}`)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at delete user')
    }
  } catch (error) {
    throw new Error('Error at delete user', error)
  }
}

export async function sendOTPToUser(param) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/send_otp', param)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at user login')
    }
  } catch (error) {
    throw new Error('Error at user login', error)
  }
}

export async function otpGenerate(param) {
  return 'success'
}
