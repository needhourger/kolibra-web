<template>
  <div v-loading="loading" class="px-10 py-5">
    <div class="text-2xl font-bold h-10">{{ bookInfo.Title }}</div>
    <div class="text-gray-500">Author: {{ bookInfo.Author }}</div>
    <el-divider class="m-0"></el-divider>
    <div class="text-xl font-bold mb-2">Chapters</div>
    <el-row :gutter="12" v-if="bookInfo">
      <el-col :span="8" :lg="8" :sm="12" :xs="24"
        v-for="chunks, ci in chaptersSplited" :key="ci">
        <RouterLink  v-for="chapter, cindex in chunks" :key="cindex"
          :to="`/reader/${bookId}/${chapter.ID}`"
          class="text-base hover:text-xl transition duration-300 h-10">
          <div class="h-8">{{ chapter.Title }}</div>
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
    if (res && res.data) {
      bookInfo.value = res.data
    }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    loading.value = false
  })
}
const queryBookChapters = () => {
  getBookChaptersById(props.bookId).then(res => {
    if (res && res.data) {
      chapters.value = res.data
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