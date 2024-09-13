import axios from 'axios'

export async function addStudent(studentData) {
  try {
    console.log('student data ', studentData)

    const response = await axios.post('http://127.0.0.1:8000/api/save_student', { studentData })
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Error at add student')
    }
  } catch (error) {
    throw new Error('Error at add student', error)
  }
}
