<template>
  <div class="note-nav">
    <div class="left" v-tap="leftClick">
      <svg-back />
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
const leftClick = (e: any) => {
  console.log(e);
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
