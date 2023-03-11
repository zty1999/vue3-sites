<template>
  <div class="note-edit">
    <div class="note-header">
      <div class="header-back" @click="leftClick()"> {{ '<' }} </div>
          <div class="note-title">{{ note.title }}</div>

      </div>
      <div class="note-content">
        {{ note.content }}
      </div>
    </div>
</template>
<script lang="ts" setup>
const note = ref<any>({
  title: 'spark note',
  content: 'spark note content'

})
const router = useRouter()
const leftClick = () => {
  console.log('click');

  router.go(-1)
}


</script>
<style lang="scss" scoped>
.note-edit {
  .note-header {
    display: flex;
    align-items: center;
    /* height: 60px; */
    font-size: 0.22rem;

    .header-back {
      box-sizing: border-box;
      padding: 30px;

    }
  }

  .note-title {}

  .note-content {
    padding: 10px;
    font-size: 0.12rem;
  }
}
</style>
