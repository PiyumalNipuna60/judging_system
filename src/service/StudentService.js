import axios from 'axios'
import { BASEURL } from '../const/const'


export async function searchStudentById(id) {
  try {
    const response = await axios.get(`${BASEURL}/api/student/${id}`)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at search student')
    }
  } catch (error) {
    throw new Error('Error at search student', error)
  }
}

export async function getStudentList() {
  try {
    const response = await axios.post(`${BASEURL}/api/get_all_student`)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error at get all student')
    }
  } catch (error) {
    throw new Error('Error at  get all student', error)
  }
}

export async function addStudent(studentData) {
  try {
    const formData = new FormData();
    formData.append('serialNo', studentData.serialNo)
    formData.append('district', studentData.district.id)
    formData.append('ageGroup', studentData.ageGroup)
    formData.append('stream', studentData.stream)
    formData.append('language', studentData.language)
    // formData.append('file', studentData.uploadedFile.file,  studentData.uploadedFile.name); // Append file to FormData
    const response = await axios.post(`${BASEURL}/api/save_student`, formData)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at add student api')
    }
  } catch (error) {
    throw new Error('Error at add student', error)
  }
}

export async function updateStudent(studentData) {
  try {
    const formData = new FormData();
    formData.append('serialNo', studentData.serialNo)
    formData.append('district', studentData.district.id)
    formData.append('ageGroup', studentData.ageGroup)
    formData.append('stream', studentData.stream)
    formData.append('language', studentData.language)
    const response = await axios.post(`${BASEURL}/api/update_student/${studentData.id}`, formData)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at update student')
    }
  } catch (error) {
    throw new Error('Error at add student', error)
  }
}

export async function deleteStudent(id) {
  try {
    const response = await axios.delete(`${BASEURL}/api/delete_student/${id}`)
    if (response.status === 200) {
      return true
    } else {
      throw new Error('Error at delete student')
    }
  } catch (error) {
    throw new Error('Error at delete student', error)
  }
}

export async function uploadImage(studentData ) {
  try {
    // const response = await axios.post('http://127.0.0.1:8000/api/save_student', { studentData })
    // if (response.status === 200) {
    //   return response.data.user
    // } else {
    //   throw new Error('Error at add student')
    // }
  } catch (error) {
    throw new Error('Error at add student', error)
  }
}
