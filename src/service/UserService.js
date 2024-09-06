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
  return [
    {
      id: 'u-001',
      userName: 'Nimal',
      password: '0000',
      availableDistricts: ['Ampara', 'Batticaloa', 'Trincomalee', 'Anuradhapura', 'Polonnaruwa'],
      language: 'sinhala',
      stream: 'essay'
    },
    {
      id: 'u-001',
      userName: 'Kamal',
      password: '4444',
      availableDistricts: ['Kurunegala', 'Puttalam', 'Badulla', 'Monaragala', 'Ratnapura'],
      language: 'sinhala',
      stream: 'art'
    },
    {
      id: 'u-001',
      userName: 'Kamani',
      password: '2222',
      availableDistricts: ['Colombo', 'Gampaha', 'Kalutara', 'Kandy'],
      language: 'tamil',
      stream: 'essay'
    },
    {
      id: 'u-001',
      userName: 'Supuni',
      password: '1111',
      availableDistricts: ['Nuwara Eliya', 'Gampaha', 'Hambantota', 'Kalutara', 'Jaffna'],
      language: 'tamil',
      stream: 'art'
    }
  ]
}

export async function createNewUser(userData) {
  userData.admin_id = 1
  userData.user_name = userData.userName
  userData.districtDetails = [
    {
      district_id: '1'
    },
    {
      district_id: '2'
    }
  ]
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
export async function deleteUserById() {
  return 'success'
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
