<template>
  <div class="p-10" v-loading="loading">
    <h1 class="text-xl font-bold">{{ chapterInfo.Title }}</h1>
    <div v-html="contentHtml"></div>
  </div>
</template>

<script setup>
import { getBookChapterById, getBookChapterContent } from '@/api';
import { computed, onMounted, ref } from 'vue';
import _ from "loadsh"

const props = defineProps({
  bookId: { type: String, default: "" },
  chapterId: { type: String, default: "" },
})
const loading = ref(false)
const chapterInfo = ref({})
const content = ref("")
const contentHtml = computed(() => {
  if (_.isEmpty(content.value)) return ""
  const lines = content.value.split('\n')
  let ret = ""
  for (let line of lines) {
    ret += line.trim() + '<br/>'
  }
  return ret
})
const queryContent = () => {
  const payload = {
    bookId: props.bookId,
    chapterId: props.chapterId
  }
  getBookChapterContent(payload).then(res => {
    if (res && res.data) {
      content.value = res.data
    }
  })
}
const queryChapter = () => {
  loading.value = true
  const payload = {
    bookId: props.bookId,
    chapterId: props.chapterId
  }
  getBookChapterById(payload).then(res => {
    if (res) {
      chapterInfo.value = res
      queryContent()
    }
  }).finally(() => {
    loading.value = false
  })
}
onMounted(() => {
  queryChapter()
})
</script>

<style lang="scss" scoped>

</style>