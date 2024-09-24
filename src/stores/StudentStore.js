import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addStudent } from '../service/StudentService'

export const useStudentStore = defineStore('StudentStore', () => {
  const markingList = ref()
  const uploadedFile = ref({})

  const addStudentData = async (studentData) => {
    return await addStudent(studentData)
  }

  const uploadImage = async (studentData) => {
    uploadedFile.value = studentData
    console.log('store_log_________', studentData);
    
  }

  return { markingList, addStudentData, uploadImage }
})
