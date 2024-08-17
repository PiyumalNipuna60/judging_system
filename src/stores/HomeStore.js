import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getMarkingList } from '../service/Homervice'

export const useHomeStore = defineStore('HomeStore', () => {
  const markingList = ref()
  // const doubleCount = computed(() =>)

  const getMarkingLists = async () => {
    markingList.value = await getMarkingList()
    return markingList.value
  }

  const markingLists = () => {
    return markingList.value
  }

  return { markingList, getMarkingLists, markingLists }
})
