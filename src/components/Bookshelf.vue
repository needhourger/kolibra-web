<script setup>
</script>

<template>
  <div class="bookshelf">
    <el-row :gutter="20">
      <el-col class="book-box" :xs="8" :sm="6" :md="4" :lg="3">
        <el-card shadow="hover">
          <template #default>
            body
          </template>
          <template #footer>
            footer
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.bookshelf {
  padding: 20px 40px;

  .book-box {
    height: 300px;
    .el-card {
      height: 100%;
      width: 100%;
    }
  }
}
</style>