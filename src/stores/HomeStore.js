import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getStudentLists, updateMarks, addMarks } from '../service/Homervice'

export const useHomeStore = defineStore('HomeStore', () => {
  const filteredStudentList = ref([])
  // const doubleCount = computed(() =>)

  const getStudentList = async (params) => {
    filteredStudentList.value = await getStudentLists(params)
    return filteredStudentList.value
  }
  
  const addStudentMarks = async (params) => {
    return await addMarks(params)
  }

  const updateStudentMarks = async (params) => {
    return await updateMarks(params)
  }

  const filteredStudentLists = computed(() =>  filteredStudentList.value)

  return { filteredStudentList, getStudentList, filteredStudentLists, addStudentMarks, updateStudentMarks }
})
