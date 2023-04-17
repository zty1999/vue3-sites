<template>
  <div id="screenfull">
      <el-icon :size="22" color="#fff" v-if="!isFullScreen">
          <i-ep-rank style="transform: rotate(45deg);" @click="fullScreen"></i-ep-rank>
      </el-icon>
      <el-icon :size="22" color="#fff" v-else>
          <i-ep-full-screen @click="fullScreen"></i-ep-full-screen>
      </el-icon>
  </div>
</template>
<script lang="ts">
import screenfull from "@/utils/screenfull.js"
import { defineComponent, reactive, Ref, ref, toRefs } from "vue";
const sf = screenfull
export default defineComponent({
  setup() {
      const state = reactive({
          isFullScreen: false,
          fullScreen: () => {
              if (!screenfull.isEnabled) {
                  // message.warning("当前您的浏览器不支持全屏 ❌")
                  return false
              }
              state.isFullScreen = !state.isFullScreen;
              sf.toggle()
          }
      })

      return {
          ...toRefs(state)

      };
  },
});
</script>
<style lang="scss" scoped>
</style>
