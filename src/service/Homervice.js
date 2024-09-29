import axios from 'axios'
import { BASEURL } from '../const/const'

export async function getStudentLists(params) {
  const requset = {
    districts: params.districtDetails,
    stream: params.stream,
    language: params.language,
    teacherId: params.teacher_id
  }
  try {
    const response = await axios.post(`${BASEURL}/api/get_all_student`, requset)
    if (response.status === 200) {
      return await mapStudentData(response.data)
    } else {
      throw new Error('Error at get student list')
    }
  } catch (error) {
    throw new Error('Error at get student list', error)
  }
}

export async function addMarks(params) {  
  try {
    const response = await axios.post(`${BASEURL}/api/save_mark`, params)    
    if (response.status === 200) {
      return true
    } else {
      throw new Error('Error at add student marks')
    }
  } catch (error) {
    throw new Error('Error at add student marks', error)
  }
}

export async function updateMarks(params) {  
  try {
    const response = await axios.put(`${BASEURL}/api/update_mark/${params.mark_id}`, params)    
    if (response.status === 201) {
      return true
    } else {
      throw new Error('Error at update student marks')
    }
  } catch (error) {
    throw new Error('Error at update student marks', error)
  }
}

async function mapStudentData(params) {
  const { students, marks } = params
  return students.map(student => ({
    ...student,
    marks: student.marks[0]
  }));
  
}