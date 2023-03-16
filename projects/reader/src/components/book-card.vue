<template>
  <div class="component">
    <div class="book-card m-2 p-2 rounded-md flex flex-col cursor-pointer shadow-sm hover:shadow-md bg-white">
      <div class="card-content text-center">
        <van-image class="w-24 h-32"
          :src="dataSource.get('cover')"
        />
      </div>
      <div class="card-footer text-left">
          <div class="card-title truncate">{{dataSource.get("name")}}</div>
          <div class="card-auth text-sm truncate">{{dataSource.get("author")}}&nbsp;</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
} from "vue";
import {  useRouter } from "vue-router";
export default defineComponent({
  name: "book-card",
  props: {
    dataSource: {
      type: Object,
      default: {},
    },
    modules: {
      type: Array,
      default: [],
    },
    routes: {
      type: Array,
      default: [],
    },
  },
  setup(props,context) {
    console.log(props);
    
    let data;
    return {
      data
    };
  },
});

</script>

<style>
</style>