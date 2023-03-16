<template>
  <div class="notelist-container">
    <template v-if="Object.keys(group).length">
      <div v-for="(value, key) in group" :key="key">
        <div class="group-title">
          {{ key }}
        </div>
        <div class="note-list" v-if="value.length">
          <div
            class="note-list-item"
            v-for="item in value"
            :key="item.id"
            @click="itemClick(item)"
          >
            <p>{{ item.title }}</p>
            <p class="secondary">{{ item.createdAt }}</p>
          </div>
        </div>
      </div>
    </template>
    <div class="empty" v-else>
      <slot name="empty"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
import relativeTime from 'dayjs/plugin/relativeTime'
const props = withDefaults(defineProps<{ list: any }>(), {
  list: [],
})
const emit = defineEmits(['item-click'])
const list = toRef(props, 'list')
let group: { [key: string]: any[] } = {}
dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言
dayjs.extend(relativeTime)
list.value.forEach((item: any) => {
  let title = dayjs(item.createdAt).fromNow()
  // dayjs().format(item.createdAt)
  item.createdAt = new Date().Format('yyyy-MM-dd hh:mm:ss')
  console.log(title)
  if (!group[title]) {
    group[title] = []
  }
  group[title].push(item)
})
const itemClick = (item: any) => {
  emit('item-click', item)
}
</script>
<style lang="scss" scoped>
.group-title {
  padding: 4px 10px;
  font-size: 0.12rem;
  color: #5d5959;
}

.note-list {
  &-item {
    box-sizing: border-box;
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid #dee1e6;
  }
}

.empty {
  padding: 10px;
  text-align: center;
  font-size: 0.14rem;
  color: #5d5959;
}
</style>
