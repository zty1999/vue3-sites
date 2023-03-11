<template>
  <div class="smart-park" ref="smartCity">
    <park-scene></park-scene>
    <park-operate></park-operate>
  </div>
  </template>
  <script lang="ts" setup>
  // 全屏控制
  import { useScreenFull } from "@/hooks/useScreenFull"
  const smartPark = ref<Element>()
  
  
  onMounted(() => {
    //   双击 渲染画面进行全屏切换
    useScreenFull(smartPark.value, "dblclick")

  });

  
  </script>
  <style lang="scss" scoped></style>
  