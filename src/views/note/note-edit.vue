<template>
  <note-nav>
    <template v-slot="right">
      ddd
    </template>
  </note-nav>
  <div class="note-edit">
    <div class="note-header">
      <BaseInput class="note-title" v-model="note.title" border="none" placeholder="无标题" />
    </div>
    <div class="note-content">
      <Tinymce v-model:value="note.content" toolbar=""></Tinymce>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
console.log(route);
let id = route.query.id

const note = ref<any>({
  title: '',
  content: '',
  createdAt: new Date(),
  // viewAt: new Date(), 
  // updatedAt: new Date(),
})
// 编辑
if (id) {
  let notes = JSON.parse(localStorage.getItem("notes") as string) || []
  note.value = notes.filter((item: any) => item.id == id)[0]
}

// 离开页面自动保存
onBeforeRouteLeave((to, from) => {
  // 这里只判断了是否为空 还应该判断是否有变化
  if (note.value.title != '' || note.value.content != '') {
    if (!note.value.title) { note.value.title = '无标题' }
    let notes = JSON.parse(localStorage.getItem("notes") as string) || []
    if (!note.value.id) {
      note.value.id = notes.length + 1;
      notes.push(note.value)
    } else {
      notes.map((item: any) => {
        if (item.id == note.value.id) {
          return note.value;
        }
        return item;
      })
    }

    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes))
  }
  return true;
  // const answer = window.confirm(
  //   'Do you really want to leave? you have unsaved changes!'
  // )
  // 取消导航并停留在同一页面上
  // if (!answer) return false
})
watch(() => route,
  (count, prevCount) => {
    /* ... */
  })
const router = useRouter()


</script>
<style lang="scss" scoped>
.note-edit {
  width: 100vw;
  display: flex;
  flex-direction: column;

  .note-header {
    display: flex;
    align-items: center;
    /* height: 60px; */
    font-size: 0.22rem;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .note-title {}

  .note-content {
    padding: 10px;
    font-size: 0.12rem;
  }
}
</style>
