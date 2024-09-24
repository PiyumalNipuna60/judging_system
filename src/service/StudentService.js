import axios from 'axios'

export async function addStudent(studentData) {
  try {
    console.log('student data-service__________ ', studentData)
    const formData = new FormData();
    formData.append('file', studentData.uploadedFile.file,  studentData.uploadedFile.name); // Append file to FormData

    const response = await axios.post('http://127.0.0.1:8000/api/save_student', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set appropriate content type
      }
    })
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at add student')
    }
  } catch (error) {
    throw new Error('Error at add student', error)
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
