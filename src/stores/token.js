import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useToken = defineStore('token',() => {
  const token = ref()
  const jwtToken = computed(() => {
    return `Bearer ${token.value}` || ""
  })
  function setToken(t) {
    if (t) {
      token.value = t
    } else {
      token.value = null
    }
  }
  return { token, jwtToken, setToken }
},{ persist: { storage: localStorage }})