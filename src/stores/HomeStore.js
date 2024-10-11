import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFilteredStudentList, updateMarks, addMarks, getStudentLists } from '../service/Homervice'

export const useHomeStore = defineStore('HomeStore', () => {
  const filteredStudentList = ref([])
  const allStudentList = ref([])
  // const doubleCount = computed(() =>)

  const getStudentList = async (params) => {
    filteredStudentList.value = await getFilteredStudentList(params)
    return filteredStudentList.value
  }

  const getAllStudents = async () => {
    allStudentList.value = await getStudentLists()
    return allStudentList.value
  }
  
  const addStudentMarks = async (params) => {
    return await addMarks(params)
  }

  const updateStudentMarks = async (params) => {
    return await updateMarks(params)
  }

  const filteredStudentLists = computed(() =>  filteredStudentList.value)
  const allStudentLists = computed(() =>  allStudentList.value)

  return { filteredStudentList, getStudentList, filteredStudentLists, addStudentMarks, updateStudentMarks, getAllStudents, allStudentLists }
})
