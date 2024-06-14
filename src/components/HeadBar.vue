

<template>
  <div class="header">
    <RouterLink class="title" :to="{ name: 'Bookshelf' }">Kolibra</RouterLink>
    <el-button plain size="large" class="w-32 font-xl font-bold" @click="handleScan">Scan</el-button>
    <el-progress :indeterminate="true" :percentage="loadStore.percentage"></el-progress>
  </div>
</template>

<script setup>
import { requestScanLibrary } from '@/api';
import { useLoadingStore} from '@/stores/loadStore';
const loadStore = useLoadingStore()
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
  .title {
    font-family: 'Silkscreen';
    font-size: 42px;
    font-weight: 600;
  }
}
</style>