import axios from 'axios'
import { BASEURL } from '../const/const'
import { sumBy } from 'lodash'

export async function getFilteredStudentList(params) {
  try {
    let response
    if (params) {
      const requset = {
        districts: params.districtList,
        stream: params.stream,
        language: params.language,
        teacherId: params.teacher_id
      }
      response = await axios.post(`${BASEURL}/api/get_all_student`, requset)
    } else {
      response = await axios.post(`${BASEURL}/api/get_all_student`)
    }
    if (response.status === 200) {
      return mapStudentData(response.data, params.teacher_id)
    } else {
      throw new Error('Error at get filtered student list')
    }
  } catch (error) {
    throw new Error('Error at get filtered student list', error)
  }
}

export async function getStudentLists() {
  try {
    let response = await axios.get(`${BASEURL}/api/get_all_student_with_mark`)
    if (response.status === 200) {
      return mapCalculations(response.data)
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

async function mapStudentData(params, teacherId) {
  const filteredStudents = params.filter(student => {
    if (student.marking_status >= 3) {
        const teacherMark = student.marks.find(mark => mark.teacher_id === teacherId)
        if (!teacherMark) {
            return false
        }
    }
    student.marks = student.marks.find(mark => mark.teacher_id === teacherId)
    return true
})
return filteredStudents
}

async function mapCalculations(params) {
  return params.map((student) => ({
    ...student,
    finalTotal: sumBy(student.marks, 'total'),
    average: sumBy(student.marks, 'total') ?  Number(sumBy(student.marks, 'total') / student.marks.length).toFixed(2) : 0
  }))
}
