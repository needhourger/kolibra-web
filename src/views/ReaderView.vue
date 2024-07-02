<template>
  <div class="render" v-loading="loading">
    <div class="text-lg font-medium leading-10 mb-1">{{ chapterInfo.Title }}</div>
    <div v-html="contentHtml" class=""></div>
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
    ret += `<div class='paraph'>${line.trim()}</div>`
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
    if (res && res.data) {
      chapterInfo.value = res.data
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
.render {
  padding: 0.25rem 1.2rem;
}
</style>
<style>
.paraph {
  color: #505050;
  margin-bottom: 1rem;
  font-family: 'FZQingKe', 'Inter';
  line-height: 1.8rem;
}
</style>