<template>
  <van-cell title="评论" />
  <div class="comment-list bg-white">
    <div class="comment p-2 border-b border-gray-100">
      <div class="comment-header flex items-center justify-between">
        <div class="header-left">
          <div class="author">百无禁忌</div>
        </div>
        <div class="header-right">
          <div class="author text-sm text-gray-400">
            第153章&nbsp;2分&nbsp;2分钟前
          </div>
        </div>
      </div>
      <div class="comment-content py-2 text-sm text-gray-500">催一下</div>
    </div>
    <div class="comment p-2 border-b border-gray-100">
      <div class="comment-header flex items-center justify-between">
        <div class="header-left">
          <div class="author">百无禁忌</div>
        </div>
        <div class="header-right">
          <div class="author text-sm text-gray-400">
            第153章&nbsp;2分&nbsp;2分钟前
          </div>
        </div>
      </div>
      <div class="comment-content py-2 text-sm text-gray-500">催一下</div>
    </div>
    <div class="comment p-2 border-b border-gray-100">
      <div class="comment-header flex items-center justify-between">
        <div class="header-left">
          <div class="author">百无禁忌</div>
        </div>
        <div class="header-right">
          <div class="author text-sm text-gray-400">
            第153章&nbsp;2分&nbsp;2分钟前
          </div>
        </div>
      </div>
      <div class="comment-content py-2 text-sm text-gray-500">催一下</div>
    </div>
    <div class="comment p-2 border-b border-gray-100">
      <div class="comment-header flex items-center justify-between">
        <div class="header-left">
          <div class="author">百无禁忌</div>
        </div>
        <div class="header-right">
          <div class="author text-sm text-gray-400">
            第153章&nbsp;2分&nbsp;2分钟前
          </div>
        </div>
      </div>
      <div class="comment-content py-2 text-sm text-gray-500">催一下</div>
    </div>
  </div>
  <van-cell
    title-class="text-red-400"
    class="text-center mt-2"
    title="查看更多评论 >>"
  />
  <!-- ul>li{商品信息$}*5 -->
  <ul>
    <li>商品信息1</li>
    <li>商品信息2</li>
    <li>商品信息3</li>
    <li>商品信息4</li>
    <li>商品信息5</li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
} from "vue";
export default defineComponent({
  name: "Comments",
  props: {
    dataSource: {
      type: Object,
      default: {},
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