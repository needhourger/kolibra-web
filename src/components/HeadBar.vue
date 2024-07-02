

<template>
  <div class="header">
    <RouterLink class="title" :to="{ name: 'Bookshelf' }">Kolibra</RouterLink>
    <el-button plain round size="large" class="w-12 font-sans" @click="handleScan">Scan</el-button>
    <el-progress
      class="absolute bottom-0 left-0 right-0"
      v-show="loadStore.isLoading"
      :indeterminate="true"
      :percentage="loadStore.percentage">
    </el-progress>
  </div>
</template>

<script setup>
import { requestScanLibrary } from '@/api';
import { useLoading} from '@/stores/loading.js'
const loadStore = useLoading()
const handleScan = () => {
  requestScanLibrary().then(res => {
    console.log(res)
  })
}
</script>

<style scoped>
.header {
  height: 60px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px 3px #f0f0f0;
  position: relative;
  .title {
    font-family: 'Silkscreen';
    font-size: 42px;
    font-weight: 600;
  }
}
</style>