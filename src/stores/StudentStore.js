import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addStudent } from '../service/StudentService'

export const useStudentStore = defineStore('StudentStore', () => {
  const markingList = ref()

  const addStudentData = async (studentData) => {
    return await addStudent(studentData)
  }

  return { markingList, addStudentData }
})
