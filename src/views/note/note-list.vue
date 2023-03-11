<template>
  <list-nav></list-nav>
  <home-list :list="list" @item-click="toEdit"></home-list>
  <speed-dial @click="toEdit()"></speed-dial>
</template>
<script lang="ts" setup>
let router = useRouter()
const list = ref<any[]>([
  { id: 1, title: '一分钟，了解spark note', content: 'content', createdAt: new Date(), viewAt: new Date(), updatedAt: new Date(), tags: ['test', 'vue', 'note'] },
  { id: 2, title: '一分钟，了解spark note', content: 'content', createdAt: new Date(), viewAt: new Date(), updatedAt: new Date(), tags: ['test', 'vue', 'note'] },
  { id: 3, title: '一分钟，了解spark note', content: 'content', createdAt: new Date(), viewAt: new Date(), updatedAt: new Date(), tags: ['test', 'vue', 'note'] },
])
const toEdit = (item?: any) => {
  router.push(
    {
      name: 'note-edit',
      query: { id: (item&&item.id) || ''}
    })
}
</script>
<style lang="scss" scoped>
.notelist-container {
  width: 100%;
  height: 100%;
}
</style>
