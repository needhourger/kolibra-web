import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('load', () => {
  const state = ref(false)
  const isloading = computed(() => state.value)
  const percentage = computed(() => 50)
  function loading() {
    state.value = true
  }
  function stop() {
    state.value = false
  }
})
