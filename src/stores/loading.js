import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoading = defineStore('load', () => {
  const state = ref(false)
  const isLoading = computed(() => state.value)
  const percentage = computed(() => 50)
  function loading() {
    state.value = true
  }
  function stop() {
    state.value = false
  }
  return { state, isLoading: isLoading, percentage, loading, stop}
})
