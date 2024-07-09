<template>
  <div class="bookshelf" v-loading="loading">
    <el-row :gutter="30">
      <el-col class="book-box"
        v-for="book,bindex in books" :key="bindex"
        :xs="12" :sm="12" :md="4" :lg="3">
        <div @click="handleRedirect(book)" class=" w-full h-full">
          <el-card shadow="hover" class="overflow-hidden">
            <div class="text-md text-center">{{ book.Title }}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getBookReadingRecord, getBooks } from '@/api';
import { isMobile } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const loading = ref(false)
const books = ref([])
const router = useRouter()

const queryBooks = () => {
  loading.value = true
  getBooks().then(res => {
    if (res && res.data) {
      console.log(res)
      books.value = res.data
    }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    loading.value = false
  })
}

const handleRedirect = (book) => {
  console.log(isMobile())
  if (isMobile()) {
    getBookReadingRecord(book.ID).then(res => {
      if (res && res.data) {
        console.log(res)
        router.push({ name: "Reader", params: {bookId: book.ID, chapterId: res.data }})
      }
    })
  } else {
    router.push({ name: "BookDetail", params: {bookId: book.ID}})
  }
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