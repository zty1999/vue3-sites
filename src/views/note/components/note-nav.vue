<template>
  <div class="note-nav">
    <div class="left" v-tap="leftClick">
      <svg-back />
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{ title?: string }>(), {
  title: '标题'
})
const router = useRouter()
const leftClick = (e: any) => {
  console.log(e);
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.note-nav {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;

  .left,
  .right {
    position: absolute;
    top: 0;
    padding: 10px;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }

  .center {
    flex: 1;
    text-align: center;
    line-height: 44px;
  }
}
</style>
