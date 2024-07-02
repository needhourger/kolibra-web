<template>
  <div :class="isMobile() ? 'render-mb' : 'render'" v-loading="loading">
    <div class="text-lg font-medium leading-10 mb-1">{{ chapterInfo.Title }}</div>
    <div v-html="contentHtml" class=""></div>
    <div class="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex items-end">
      <div class="w-1/4 h-1/2" @click="redirectChapter(false)"></div>
      <div class="w-1/2 h-1/2" @click="tocMShow = true"></div>
      <div class="w-1/4 h-1/2" @click="redirectChapter(true)"></div>
    </div>
    <TocMobile v-model="tocMShow" :bookId="bookId" :chapterId="chapterId"/>
  </div>
</template>
<script setup>
import { getBookChapterById, getBookChapterContent } from '@/api';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import _ from "loadsh"
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { isMobile } from '@/utils';
import TocMobile from '@/components/TocMobile.vue';

const props = defineProps({
  bookId: { type: String, default: "" },
  chapterId: { type: String, default: "" },
})
const tocMShow = ref(false)
const loading = ref(false)
const chapterInfo = ref({})
const content = ref("")
const router = useRouter()
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
const redirectChapter = (next = true) => {
  const bookId = _.get(chapterInfo.value, 'BookID', "")
  const chapterId = _.get(chapterInfo.value, next ? 'NextChapterID' : 'PreviousChapterID', '')
  if (bookId && chapterId) {
    router.push({ name: 'Reader', params: { bookId, chapterId } })
  } else if (!chapterId) {
    ElMessage.info(next ? 'This is the last chapter' : 'This is the first chapter')
  }
}
const scroll2Top = () => {
  window.scrollTo({ top: 0 })
}
watch(() => props.chapterId, () => {
  queryChapter()
  scroll2Top()
})
onMounted(() => {
  queryChapter()
})
onUnmounted(() => {
})
</script>
<style lang="scss" scoped>
.render-mb {
  padding: 0.25rem 1.2rem;
  /*   display: block;
  width: 100vw;
  height: 100vh;
  overflow: auto; */
}

.render {
  width: 45%;
  height: 100%;
  margin-inline: auto;
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