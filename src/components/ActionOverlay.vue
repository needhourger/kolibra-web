<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen font-medium">
    <div class="flex w-screen h-full">
      <div class="w-1/5 h-full flex items-center justify-center" :class="{ 'bg-red-200 bg-opacity-70': helpShow }"
        @click="emits('previousPage')">
        <span v-show="helpShow">Previous chapter</span>
      </div>
      <div class="w-4/5 h-full">
        <div class="w-full h-1/6 flex items-center justify-center" :class="{ 'bg-pink-200 bg-opacity-70': helpShow }"
          @click="tocMShow = true">
          <span v-show="helpShow" class="text-sm">Open chapter list</span>
        </div>
        <div class="w-full h-5/6 flex items-center justify-center" :class="{ 'bg-blue-200 bg-opacity-70': helpShow }"
          @click="menuShow = true">
          <span v-show="helpShow" class="text-sm">Open menu</span>
        </div>
      </div>
      <div class="w-1/5 h-full flex items-center justify-center" :class="{ 'bg-green-200 bg-opacity-70': helpShow }"
        @click="emits('nextPage')">
        <span v-show="helpShow">Next chapter</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const helpShow = defineModel("helpShow")
const menuShow = defineModel("menuShow")
const emits = defineEmits(["nextPage", "previousPage"])
</script>
<style lang="scss" scoped></style>
