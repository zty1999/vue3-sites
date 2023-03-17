<template>
  <div class="page-container bg-reader p-2 relative">
    <div class="menu-top" v-if="showMenu">
      <i name="left-arrow"></i>
      <van-button type="success" class="px-2 w-20">下载</van-button>
      <van-button>书签</van-button>
      <van-button>...</van-button>
    </div>
    <nav class="text-xs text-gray-400">
      <div class="left">
        <div class="title">{{ book.name }}</div>
      </div>
      <div class="right"></div>
    </nav>
    <main v-if="chapter && chapter.id">
      <div
        class="
          article-content
          relative
          py-4
          text-gray-500
          border-b border-gray-100
        "
      >
        <div class="title border-double">
          第{{ chapter.get("index") }}章 {{ chapter.get("title") }}
        </div>
        <div class="content">
          {{ chapter.get("content") }}
        </div>
      </div>
    </main>
    <footer>
      <div class="menu-bottom" v-if="showMenu">
        <van-button class="font-control">字体</van-button>
        <van-button class="light-control">亮度</van-button>
        <van-button class="chapter-control">跳转</van-button>
        <van-button class="listen-control">听书</van-button>
        <van-button class="chapters-control">列表</van-button>
      </div>
    </footer>
    <div class="menu-control" @click="menuControl()"></div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getBooks, getBook, getChapters, getCount } from "./book.service";
import { defineComponent, toRefs, reactive, ref } from "vue";
export default {
  setup() {
    const router = useRouter();
    console.log(router);
    /* menu */
    let showMenu: any = ref(false);
    /* book */
    let book: any = reactive({});
    let chapters: any = ref([]);
    let chapter: any = reactive({});
    const bookId = router.currentRoute.value.params.id;

    let content = "";
    let conLen = content.length;
    let pagesize = 2000; //每页字符串数
    let pageCount = 1; //页数
    if (conLen > pagesize) {
      pageCount = conLen / pagesize;
    }
    return {
      bookId,
      router,
      book,
      chapters,
      chapter,
      content,
      showMenu,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const bookId = this.router.currentRoute.value.params.id;
      let book: any = await getBook(bookId);
      this.book = book.toJSON();
      console.log(this.router, this.book);
      this.chapters = await getChapters(
        bookId,
        {
          type: "descending",
          key: "createdAt",
        },
        20
      );
      this.chapter = this.chapters[0];
      console.log(this.chapters, this.chapter, this.book);
    },
    onClickLeft() {
      this.router.back();
    },
    menuControl() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss">
.menu-control {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 300px;
}
.article-content {
  height: calc(100vh - 50px);
  .content {
    height: calc(100% - 48px);
    overflow: scroll;
  }
}
</style>