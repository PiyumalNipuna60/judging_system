import { ref } from 'vue'
import { defineStore } from 'pinia'
import { addStudent, searchStudentById, getStudentList, updateStudent, deleteStudent } from '../service/StudentService'

export const useStudentStore = defineStore('StudentStore', () => {
  const markingList = ref()
  const uploadedFile = ref({})
  const studentList = ref([])

  const searchStudent = async (id) => {
    return await searchStudentById(id)
  }

  const addStudentData = async (studentData) => {
    return await addStudent(studentData)
  }

  const updateStudentData = async (studentData) => {
    return await updateStudent(studentData)
  }

  const removeStudentData = async (id) => {
    return await deleteStudent(id)
  }

  const getAllStudents = async (studentData) => {
    const response = await getStudentList(studentData)    
    studentList.value = response
    return studentList.value
  }

  const uploadImage = async (studentData) => {
    uploadedFile.value = studentData
    console.log('store_log_________', studentData);
  }

  return { markingList, addStudentData, uploadImage, searchStudent, getAllStudents, updateStudentData, removeStudentData }
})
