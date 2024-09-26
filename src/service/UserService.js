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
  try {
    const response = await axios.post(`${BASEURL}/api/save_teacher`, userData)
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
    const response = await axios.delete(`${BASEURL}/api/delete_teacher/${id}`)
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
  console.log('Lof', param);
  try {
    const response = await axios.post(`${BASEURL}/api/verify_otp`, param)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at otp verification')
    }
  } catch (error) {
    throw new Error('Error at otp verification', error)
  }
}

export async function otpGenerate(param) {
  return 'success'
}


export async function loadDBampleData() {
  await districtReg()
  await userReg()
  await teacherReg()
}

const userReg = async () => {
  let response = await axios.post(`${BASEURL}/api/register`, {
    "user_name":"user",
    "contact":"+94705045098",
    "password":"1234"
})

console.log('user reg responce', response);
   response = await axios.post(`${BASEURL}/api/register`, {
    "user_name":"admin",
    "contact":"+94705045099",
    "password":"1234"
})

console.log('user reg responce', response);
}
const teacherReg =async () => {
  let response = await axios.post(`${BASEURL}/api/save_teacher`, 
    {
      "userName": "Nimal",
      "password": "1234",
      "availableDistricts": [1, 2],
      "language": "Sinhala",
      "stream": "Essay",
      "contact": 705044099,
      "adminId": 2,
  }
  )
console.log('teacher reg responce', response);

  response = await axios.post(`${BASEURL}/api/save_teacher`, 
    {
      "userName": "user",
      "password": "1234",
      "availableDistricts": [1, 2, 3, 4],
      "language": null,
      "stream": "Art",
      "contact": 705044099,
      "adminId": 2,
  }
  )
console.log('teacher reg responce 2', response);
}
const teacherReg2 = () => {

}
const districtReg = async () => {

  try {
    DISTRICTS.forEach(async district => {
      await axios.post(`${BASEURL}/api/save_district`, {
        "name": district.name
    })
    });
  } catch (error) {
    console.error('district error log', error); 
  }
}