<template>
  <div class="notelist-container">
    <div class="note-list">
      <div class="note-list-item" v-for="item in list" :key="item.id" @click="itemClick(item)">
        <p>{{ item.title }}</p>
        <p class="secondary">{{ item.viewAt }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ list: any }>(),
  {
    list: []
  })
const emit = defineEmits(['item-click'])
const { list } = props
const itemClick = (item: any) => {
  emit('item-click', item)
}
</script>
<style lang="scss" scoped>
.note-list {
  &-item {
    box-sizing: border-box;
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid #dee1e6;
  }
}
</style>
