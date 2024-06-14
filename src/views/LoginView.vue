<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <el-card class="w-96 h-fit -translate-y-12">
      <div class="text-2xl font-bold silkscreen">Kolibra Login</div>
      <span class="text-gray-500 text-sm my-5">Welcome to Kolibra Private library</span>
      <el-form model="form" size="large" label-position="top" status-icon>
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="form.password" show-password @keydown.enter="handleLogin"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" class="w-full" @click="handleLogin">Login</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { requestAuth } from "@/api";
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router";
const form = reactive({
  username: "",
  password: ""
})
const route = useRoute()
const router = useRouter()
const handleLogin = () => {
  console.log("login")
  const payload = {
    ...form
  }
  requestAuth(payload).then(res => {
    router.push(route.query.to || "/")
  }).catch(err => {
    console.log(err)
  })
}
</script>

<style lang="scss" scoped>

</style>