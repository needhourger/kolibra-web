<template>
  <el-drawer v-model="show"
    lock-scroll close-on-click-modal
    close-on-press-escape destroy-on-close
    direction="ltr" size="75%"
    style="--el-drawer-padding-primary: 0;"
    :show-close="false">
    <template #header>
      <div class="h-8 flex items-center px-3">
        <span class="text-lg font-medium">Chapters</span>
      </div>
    </template>
    <template #default>
      <div class="mx-2 text-base">
        <div v-for="c, cindex in chapters" :key="cindex"
          class="border-b border-solid py-1 px-2 cursor-pointer"
          @click="redirectChapter(c)"
          :class="c.ID === chapterId?' bg-slate-200':''">
          <span>{{ c.Title }}</span>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { getBookChaptersById } from '@/api';
import { onMounted, ref, watch } from 'vue';
import _ from "loadsh"
import { useRouter } from 'vue-router';

const show = defineModel()

const props = defineProps({
  bookId: { type: String, default: "" },
  chapterId: { type: String, default: "" },
})
const chapters = ref([])
watch(() => props.bookId, () => {
  queryBookChapters()
})
const queryBookChapters = () => {
  console.log(props.bookId)
  if (_.isEmpty(props.bookId)) return
  getBookChaptersById(props.bookId).then((res) => {
    if (res && res.data) {
      chapters.value = res.data
    }
  })
}
const router = useRouter()
const redirectChapter = (c) => {
  router.push({name:'Reader',params:{bookId:c.BookID, chapterId:c.ID}})
}
onMounted(() => {
  queryBookChapters()
})
</script>

<style lang="less" scoped>
</style>
