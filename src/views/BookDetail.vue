<template>
  <div v-loading="loading" class="px-10 py-5">
    <h1 class="text-3xl font-bold">{{ bookInfo.Title }}</h1>
    <h2 class="">Author: {{ bookInfo.Author }}</h2>
    <el-divider></el-divider>
    <h1 class="text-3xl font-bold">Chapters</h1>
    <el-row :gutter="12" v-if="bookInfo">
      <el-col :span="8" v-for="chapter, cindex in chapters" :key="cindex">
        <RouterLink :to="`/reader/${bookId}/${chapter.ID}`">
          <h2>{{ chapter.Title }}</h2>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getBookByID, getBookChaptersById } from '@/api'
import { ElMessage } from 'element-plus';
const props = defineProps({
  bookId: { type: String, default: '' },
})
const bookInfo = ref({})
const chapters = ref([])
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
const queryBookChapters = () => {
  getBookChaptersById(props.bookId).then(res => {
    if (res) {
      chapters.value = res
    }
  }).then(err => {
    console.log(err)
  })
}
onMounted(() => {
  queryBookDetail()
  queryBookChapters()
})
</script>