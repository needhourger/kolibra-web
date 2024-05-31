<template>
  <div v-loading="loading" class="px-10 py-5">
    <h1 class="text-3xl font-bold">{{ bookInfo.Title }}</h1>
    <h2 class="">Author: {{ bookInfo.Author }}</h2>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getBookByID } from '@/api'
import { ElMessage } from 'element-plus';
const props = defineProps({
  bookId: { type: String, default: '' },
})
const bookInfo = ref({})
const loading = ref(false)
const queryBookDetail = () => {
  loading.value = true
  getBookByID(props.bookId).then(res => {
    if (res) {
      bookInfo.value = res
    }
  }).catch(err => {
    ElMessage.error(err.error)
    console.log(err)
  }).finally(() => {
    loading.value = false
  })
}
onMounted(() => {
  queryBookDetail()
})
</script>