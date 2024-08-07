<template>
  <div :class="isMobile() ? 'container-mb' : 'container'" v-loading="loading">
    <div v-html="contentHtml"
      :class="isMobile()?'content-mb':'content'" ref="contentRef"></div>
    <MobileActionOverlay v-if="isMobile()"
      v-model:helpShow="helpShow"
      v-model:menuShow="menuShow"
      v-model:tocShow="tocShow"
      @nextPage="nextPage"
      @previousPage="previousPage"/>
    <ActionOverlay v-else
      v-model:helpShow="helpShow"
      v-model:menuShow="menuShow"
      v-model:tocShow="tocShow"
      @nextPage="nextPage"
      @previousPage="previousPage"/>
    <TocMobile v-model="tocShow" :bookId="bookId" :chapterId="chapterId"/>
    <ReaderMenuMobile v-model="menuShow" :bookInfo="bookInfo" @showHelp="(v) => helpShow=v"/>
  </div>
</template>
<script setup>
import { getBookByID, getBookChapterById, getBookChapterContent } from '@/api';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import _ from "loadsh"
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { isMobile } from '@/utils';
import TocMobile from '@/components/TocDrawer.vue';
import ReaderMenuMobile from '@/components/ReaderMenuMobile.vue';
import MobileActionOverlay from '@/components/MobileActionOverlay.vue';
import ActionOverlay from "@/components/ActionOverlay.vue"

const props = defineProps({
  bookId: { type: String, default: "" },
  chapterId: { type: String, default: "" },
})
const helpShow = ref(false)
const tocShow = ref(false)
const menuShow = ref(false)
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
      nextTick(() => {
        scroll2Top()
      })
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
      if (isMobile()) {
        el.scrollLeft = el.scrollLeft + el.offsetWidth
      } else {
        const targetLeft = el.scrollLeft + el.offsetWidth + 48
        // console.log("old max", el.scrollLeftMax, el.offsetWidth);
        if (targetLeft > el.scrollLeftMax) {
          const block = document.createElement('p')
          block.style.width = `${el.offsetWidth / 2 - 48}px`
          block.style.height = "100%"
          el.appendChild(block)
          // console.log("new max:", el.scrollLeftMax, targetLeft);
        }
        el.scrollLeft = targetLeft
      }
    } else {
      redirectChapter(true)
    }
  }
}
const previousPage = () => {
  const el = contentRef.value.$el || contentRef.value
  if (el) {
    if (el.scrollLeft > 0) {
      if (isMobile()) {
        el.scrollLeft = el.scrollLeft + el.offsetWidth
      } else {
        el.scrollLeft = el.scrollLeft - el.offsetWidth - 48
      }
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

.content-mb {
  height: calc(100vh - 16px);
  columns: calc(100vw - 48px) auto;
  column-gap: 0;
  overflow: hidden;
}

.container {
  width: 100vw;
  height: 100vh;
  padding: 24px 48px;
}

.content {
  height: calc(100vh - 48px);
  width: calc(100vw - 96px);
  columns: calc(50vw - 96px) auto;
  column-gap: 48px;
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