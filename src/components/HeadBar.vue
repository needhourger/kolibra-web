<template>
  <div class="header">
    <RouterLink class="title" :to="{ name: 'Bookshelf' }">Kolibra</RouterLink>
    <div @click="handleScan" class="rounded-md p-1 cursor-pointer hover:bg-slate-50 active:bg-slate-100">
      <img src="@/assets/images/pixel-refresh.svg" width="32" height="32">
    </div>
  </div>
</template>

<script setup>
import { requestScanLibrary } from '@/api';
import { ElMessage } from 'element-plus';
const handleScan = () => {
  requestScanLibrary().then(res => {
    console.log(res)
    ElMessage.success("Request scanning successfully. Please refresh bookshelf later.")
  })
}
</script>

<style scoped>
.header {
  height: 60px;
  width: 100vw;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px 3px #f0f0f0;
  position: relative;
  .title {
    font-family: 'Silkscreen';
    font-size: 42px;
    font-weight: 700;
  }
}
</style>