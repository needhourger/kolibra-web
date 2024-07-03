<template>
  <div class="reader-menus" v-show="show">
    <div class="w-full h-14 bg-yellow-50 shadow-xl flex items-center px-3">
      <RouterLink :to="{name:'Bookshelf'}" class="flex items-center">
        <el-icon size="24" color="#5D5D5D"><DArrowLeft/></el-icon>
      </RouterLink>
      <span class="ml-1">{{ bookInfo.Title || '' }}</span>
      <el-icon @click="emits('showHelp',true)" size="24" class="ml-auto" color="#5D5D5D">
        <QuestionFilled/>
      </el-icon>
    </div>
    <div class="h-full" @click="show = !show"></div>
  </div>
</template>

<script setup>
import { DArrowLeft, QuestionFilled } from "@element-plus/icons-vue"
import { watch } from "vue";
const show = defineModel()
const props = defineProps({
  bookInfo: { type: Object, default: () => {} }
})
watch(() => show.value,(newVal) => {
  if (!newVal) {
    emits('showHelp',false)
  }
})
const emits = defineEmits("showHelp")
</script>

<style scoped>
.reader-menus {
  position:fixed;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
</style>