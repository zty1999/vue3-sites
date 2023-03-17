<template>
  <div class="page-container">
    <van-nav-bar :title="navTitle" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <main class="p-2" v-if="book  ">
      <div class="book-info flex items-center bg-white p-2">
        <van-image class="w-24 h-32 mx-2" :src="book.info['cover']" />
        <div class="info-text flex-1">
          <div class="title py-2">{{ book.info.name }}</div>
          <div class="author py-1 text-gray-500 text-sm">
            {{ book["author"] }}
          </div>
          <div class="desc text-gray-400 text-xs">分类：原创-纯爱</div>
          <div class="desc text-gray-400 text-xs">
            全文字数：616,568({{ book.info["status"] }})
          </div>
        </div>
      </div>
      <div class="oprate my-2 flex justify-between">
        <van-button
          type="success"
          class="px-2 w-20"
          @click="toPage('/book-reader/' + bookId)"
          >开始阅读</van-button
        >
        <van-button
          type="default"
          class="px-2 w-20"
          @click="toPage('/book-chapter/' + bookId)"
          >章回列表</van-button
        >
        <van-button type="default" class="px-2 w-20" @click="star()"
          >加入书架</van-button
        >
        <van-button type="default" class="w-20 px-2">我的书签</van-button>
      </div>
      <article class="book-detail">
        <van-cell
          class="truncate"
          :value="chapters[0] ? chapters[0].get('title') : ''"
        >
          <template #title>
            <span>最新更新：</span>
          </template>
        </van-cell>
        <div
          class="
            book-introduct
            text-sm
            bg-white
            p-2
            text-gray-500
            h-32
            overflow-auto
          "
        >
          {{ book.info["desc"] }}
        </div>
      </article>
      <section>
        <div class="comments my-2">
          <comments />
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, toRefs, reactive, ref } from "vue";

import Comments from "../../components/comments/comments.vue";

import { getBooks, getBook, getChapters } from "./book.service";

export default {
  components: {
    Comments,
  },
  setup() {
    const router = useRouter();
    console.log(router);
    let info: any = ref({});
    let chapters: any = [];
    const navTitle = router.currentRoute.value.meta.title;
    const bookId = router.currentRoute.value.params.id;

    const initData = async () => {
      info.value = await getBook(bookId);
      info.value =info.value.toJSON()
      console.log(info, info.value);
      console.log(router, info.value);
    };
    initData();
    let book = reactive({
      info,
    });

    const datad = () => {
      console.log(book.info, book.info.cover);
      console.log(book);
    };
    datad();

    return {
      navTitle,
      bookId,
      router,
      book,
      // chapters,
      // initData
    };
  },
  data() {
    return {
      book: {},
      chapters: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const bookId = this.router.currentRoute.value.params.id;
      //  let book: any = await getBook(bookId);
      // this.book = book.toJSON();
      console.log(this.router, this.book);
      this.chapters = await getChapters(
        bookId,
        {
          type: "descending",
          key: "createdAt",
        },
        1
      );
      console.log(this.chapters);
    },
    star() {
      // BookService.collectBook();
    },
    onClickLeft() {
      this.router.back();
    },
    toPage(path: string) {
      this.router.push(path);
    },
  },
};
</script>

<style lang="scss">
.book-detail {
  .van-cell__title {
    flex: 0;
  }
}
</style>