<template>
  <list-nav></list-nav>
  <home-list :list="notes" @item-click="toEdit">
    <template v-slot:empty="{ node }">
      <p>暂无笔记</p>
    </template>
  </home-list>
  <speed-dial v-tap="toEdit"></speed-dial>
</template>
<script lang="ts" setup>
let router = useRouter()
let notes = JSON.parse(localStorage.getItem("notes") as string) || []
console.log(Date.prototype);
notes = notes.map((note: any) => {
  console.log(note);
  // note.createdAt = new Date(note.createdAt).Format("yyyy-MM-dd hh:mm:ss");
  return note;
})
// const list = ref<any[]>([
//   { id: 1, title: '一分钟，了解spark note', content: 'content', createdAt: new Date(), viewAt: new Date(), updatedAt: new Date(), tags: ['test', 'vue', 'note'] },
//   { id: 2, title: '一分钟，了解spark note', content: 'content', createdAt: new Date(), viewAt: new Date(), updatedAt: new Date(), tags: ['test', 'vue', 'note'] },
//   { id: 3, title: '一分钟，了解spark note', content: 'content', createdAt: new Date(), viewAt: new Date(), updatedAt: new Date(), tags: ['test', 'vue', 'note'] },
// ])
const toEdit = (item?: any) => {
  console.log(item);

  
  router.push(
    {
      name: 'note-edit',
      query: { id: (item && item.id) || '' }
    })
}
</script>
<style lang="scss" scoped>
.notelist-container {
  width: 100%;
  height: 100%;
}
</style>
