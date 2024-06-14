<template>
  <div v-loading="loading" class="px-10 py-5">
    <h1 class="text-3xl font-bold">{{ bookInfo.Title }}</h1>
    <h2 class="">Author: {{ bookInfo.Author }}</h2>
    <el-divider></el-divider>
    <h1 class="text-3xl font-bold">Chapters</h1>
    <el-row :gutter="12" v-if="bookInfo">
      <el-col :span="8" v-for="chunks, ci in chaptersSplited" :key="ci">
        <RouterLink  v-for="chapter, cindex in chunks" :key="cindex"
          :to="`/reader/${bookId}/${chapter.ID}`">
          <h2>{{ chapter.Title }}</h2>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { getBookByID, getBookChaptersById } from '@/api'
const props = defineProps({
  bookId: { type: String, default: '' },
})
const bookInfo = ref({})
const chapters = ref([])
const loading = ref(false)
const chaptersSplited = computed(() => {
  const chunkSize = Math.ceil(chapters.value.length / 3)
  return [chapters.value.slice(0,chunkSize), chapters.value.slice(chunkSize+1,2 * chunkSize), chapters.value.slice(2 * chunkSize + 1)]
})
const queryBookDetail = () => {
  loading.value = true
  getBookByID(props.bookId).then(res => {
    if (res) {
      bookInfo.value = res
    }
  }).catch(err => {
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