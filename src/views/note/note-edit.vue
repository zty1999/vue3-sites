<template>
  <note-nav>
    <template v-slot="right">

    </template>
  </note-nav>
  <div class="note-edit">
    <div class="note-header">
      <div class="note-title">
        <bs-input type="text" v-model="note.title" border="none"/>
      </div>
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


</script>
<style lang="scss" scoped>
.note-edit {
  
  .note-header {
    display: flex;
    align-items: center;
    /* height: 60px; */
    font-size: 0.22rem;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .header-back {
      box-sizing: border-box;
      padding: 20px 20px;

    }
  }

  .note-title {}

  .note-content {
    padding: 10px;
    font-size: 0.12rem;
  }
}
</style>
