<template>
  <div class="note-nav">
    <div class="left" @click="leftClick">
      <svg-back/>
    </div>
    <div class="center">
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
const leftClick = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.note-nav {
  display: flex;
  align-items: center;

  .left,
  .right {
    padding: 10px;
  }

  .center {
    flex: 1;
  }
}
</style>
