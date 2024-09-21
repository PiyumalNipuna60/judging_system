import axios from 'axios'

export async function userLogIn(userName, password) {
  try {
    const response = await axios.post('https://54.161.152.240:80/api/user-login', {
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
    const response = await axios.post('https://54.161.152.240:80/api/login', {
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
    const response = await axios.get('https://54.161.152.240:80/api/get_all_teacher')
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
    const response = await axios.post('https://54.161.152.240:80/api/save_teacher', userData)
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
    const response = await axios.delete(`https://54.161.152.240:80/api/delete_teacher/${id}`)
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
    const response = await axios.post('https://54.161.152.240:80/api/send_otp', param)
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
