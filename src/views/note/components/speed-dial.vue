<template>
  <div class="dial-wrapper shadow-black shadow-sm">
    <svg t="1678495800938" class="icon dial-icon"
      :style="styleStrToObject(`display: block; height: ${height}px; width: ${width}px; fill: currentcolor;`)" width="200"
      height="200" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3112">
      <path
        d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32"
        fill="#ffffff" p-id="3113"></path>
    </svg>
  </div>
</template>
<script lang="ts" setup>
import { styleStrToObject } from '@/utils/strFormat'
const width = ref<number>(30)
const height = ref<number>(30)
</script>
<style lang="scss" scoped>
.dial-wrapper {
  position: fixed;
  right: .2rem;
  bottom: .2rem;
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
  color: #fff;
  background-color: #1976d2;

  .dial-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
