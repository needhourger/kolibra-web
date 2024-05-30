<template>
  <div class="bookshelf" v-loading="loading">
    <el-row :gutter="30">
      <el-col class="book-box"
        v-for="book,bindex in books" :key="bindex"
        :xs="8" :sm="6" :md="4" :lg="3">
        <router-link :to="`/book/${book.ID}`">
          <el-card shadow="hover">
            <div>{{ book.Title }}</div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getBooks } from '@/api';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const loading = ref(false)
const books = ref([])

const queryBooks = () => {
  loading.value = true
  getBooks().then(res => {
    if (res) {
      console.log(res)
      books.value = res
    }
  }).catch(err => {
    ElMessage.error(err.error)
    console.log(err)
  }).finally(() => {
    loading.value = false
  })
}
onMounted(() => {
  queryBooks()
})
</script>

<style scoped lang="less">
.bookshelf {
  padding: 20px 40px;
}
.book-box {
  height: 200px;
  text-decoration: none;
  .el-card {
    height: 100%;
    width: 100%;
  }
}
</style>