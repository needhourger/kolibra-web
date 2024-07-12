<template>
  <div :class="isMobile() ? 'container-mb' : 'container'" v-loading="loading">
    <div v-html="contentHtml" class="content" ref="contentRef"></div>
    <div class="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen font-medium">
      <div class="flex w-screen h-1/2">
        <div class="w-1/4 h-full flex items-center justify-center"
          :class="{'bg-pink-200 bg-opacity-70':helpMSHow }" @click="tocMShow = true">
          <span v-show="helpMSHow" class="text-sm">Open chapter list</span>
        </div>
        <div class="w-3/4 h-full flex items-center justify-center"
          :class="{'bg-blue-200 bg-opacity-70':helpMSHow}" @click="menuMShow = true">
          <span v-show="helpMSHow" class="text-sm">Open menu</span>
        </div>
      </div>
      <div class="flex w-screen h-1/2">
        <div class="w-1/3 h-full flex items-center justify-center"
          :class="{'bg-red-200 bg-opacity-70':helpMSHow}" @click="previousPage">
          <span v-show="helpMSHow">Previous chapter</span>
        </div>
        <div class="w-1/3 h-full flex items-center justify-center"
          :class="{'bg-blue-200 bg-opacity-70':helpMSHow}" @click="menuMShow = true">
        </div>
        <div class="w-1/3 h-full flex items-center justify-center"
          :class="{'bg-green-200 bg-opacity-70':helpMSHow}" @click="nextPage">
          <span v-show="helpMSHow">Next chapter</span>
        </div>
      </div>
    </div>
    <TocMobile v-model="tocMShow" :bookId="bookId" :chapterId="chapterId"/>
    <ReaderMenuMobile v-model="menuMShow" :bookInfo="bookInfo" @showHelp="(v) => helpMSHow=v"/>
  </div>
</template>
<script setup>
import { getBookByID, getBookChapterById, getBookChapterContent } from '@/api';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import _ from "loadsh"
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { isMobile } from '@/utils';
import TocMobile from '@/components/TocMobile.vue';
import ReaderMenuMobile from '@/components/ReaderMenuMobile.vue';

const props = defineProps({
  bookId: { type: String, default: "" },
  chapterId: { type: String, default: "" },
})
const helpMSHow = ref(false)
const tocMShow = ref(false)
const menuMShow = ref(false)
const loading = ref(false)
const chapterInfo = ref({})
const content = ref("")
const router = useRouter()
const bookInfo = ref({})
const contentRef=ref()
const contentHtml = computed(() => {
  if (_.isEmpty(content.value)) return ""
  const lines = content.value.split('\n')
  let ret = `<h2>${chapterInfo.value.Title}</h2>`
  for (let line of lines) {
    ret += `<p class='paraph'>${line.trim()}</p>`
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

const nextPage = () => {
  const el = contentRef.value.$el || contentRef.value
  if (el) {
    if (el.scrollLeft < el.scrollLeftMax) {
      el.scrollLeft = el.scrollLeft + el.offsetWidth
    } else {
      redirectChapter(true)
    }
  }
}
const previousPage = () => {
  const el = contentRef.value.$el || contentRef.value
  if (el) {
    if (el.scrollLeft > 0) {
      el.scrollLeft = el.scrollLeft - el.offsetWidth
    } else {
      redirectChapter(false)
    }
  }
}
const scroll2Top = () => {
  const el = contentRef.value.$el || contentRef.value
  if (el) {
    el.scrollTo({ top:0, left: 0 })
  }
}
const queryBookInfo = () => {
  getBookByID(props.bookId).then(res => {
    if (res && res.data) {
      bookInfo.value = res.data
    }
  })
}
watch(() => props.chapterId, () => {
  queryChapter()
  scroll2Top()
})
watch(() => props.bookId, () => {
  queryBookInfo()
})
onMounted(() => {
  queryBookInfo()
  queryChapter()
})
onUnmounted(() => {
})
</script>
<style lang="scss" scoped>
.container-mb {
  width: 100vw;
  height: 100vh;
  padding: 8px 24px;
}

.container {
  width: 45%;
  height: 100%;
  margin-inline: auto;
}

.content {
  height: calc(100vh - 16px);
  columns: calc(100vw - 48px) auto;
  column-gap: 0;
  overflow: hidden;
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