<template>
  <div class="page-container">
    <van-nav-bar
      :title="navTitle"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
    </van-nav-bar>
    <main>
      <section>
        <div class="chapters my-2">
          <van-cell
            title="章回列表"
            border="false"
            class="font-semibold text-base mb-2"
          />
          <div class="chapter-list bg-white" v-if="chapters && chapters.length">
            <div
              class="chapter p-2 border-b border-gray-100"
              v-for="chapter in chapters"
              :key="chapter.id"
            >
              <div class="chapter-header flex items-center justify-between">
                <div class="header-left flex">
                  <div class="num mr-2 text-red-400">
                    {{ chapter.get("index") }}
                  </div>
                  <div class="title">{{ chapter.get("title") }}</div>
                </div>
                <div class="header-right"></div>
              </div>
              <!-- <div class="chapter-desc py-2 text-sm text-gray-500">
                <div class="date">{{chapter.get("update")}}</div>
              </div> -->
            </div>
          </div>
          <!-- <van-cell
            class="border-b border-gray-100"
            title="查看更多章节"
            icon="arrow-down"
          /> -->
          <van-pagination
            v-model="currentPage"
            :total-items="total"
            :items-per-page="pageSize"
            :show-page-size="6"
            :page-count="pageCount"
            force-ellipses
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, toRefs, reactive, ref } from "vue";

import { getBooks, getBook, getChapters, getCount } from "./book.service";


export default {
  setup() {
    const router = useRouter();
    const navTitle = router.currentRoute.value.meta.title;
    const bookId = router.currentRoute.value.params.id;
    let chapters: any = ref([]);
    /* 分页 */
    let currentPage = ref(1);
    let total = ref(0);
    let pageSize = ref(20);
    // const pageCount = ref(0);
    
    const onClickLeft = () => {
      router.back();
    };
    const onClickRight = () => {};
    const toPage = (path: string) => {
      router.push(path);
    };
    return {
      navTitle,
      chapters,
      bookId,
      currentPage,
      total,
      pageSize,
      // pageCount,
      onClickLeft,
      onClickRight,
      toPage,
    };
  },
  created() {
    this.initData();
  },
  computed: {
    pageCount() {
      // `this` 指向 vm 实例
      return this.total/this.pageSize;
    },
  },
  methods: {
    async initData() {
      this.chapters = await getChapters(
        this.bookId,
        {
          type: "descending",
          key: "createdAt",
        },
        this.pageSize
      );
      this.total = await getCount("Chapter", "book", this.bookId);
      console.log(this.chapters, this.total);
    },
  },
};
</script>
<style>
</style>