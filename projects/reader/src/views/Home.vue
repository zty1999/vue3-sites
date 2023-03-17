<template>
  <div class="page-container">
    <van-nav-bar :title="navTitle" left-arrow>
      <template #left>
        <van-icon name="search" size="18" />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="book-list flex flex-wrap justify-between p-2">
      <template v-for="(book, index) in books" :key="index">
        <book-card
          style="width: 50%;"
          routerlink="/book-detail"
          @click="toPage(book.id)"
          :dataSource="book"
        />
       
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import BookCard from "../components/book-card.vue";
import { useRoute, useRouter } from "vue-router";
import { getBooks } from "./book/book.service";
import { defineComponent, toRefs, reactive, ref } from "vue";
export default {
  components: {
    BookCard,
  },
  setup() {
    const router = useRouter();
    const navTitle = router.currentRoute.value.meta.title;
    // let books: any = toRefs([]);
    // const initData = async () => {
    //   books = await getBooks();
    //   console.log(books);
    // };
    // initData();

    console.log(router);

    return {
      router,
      navTitle,
      // books,
    };
  },
  data() {
    return {
      books: [],
    };
  },
  async beforeCreate() {
    this.books = await getBooks();
  },

  methods: {
    toPage(bookId) {
      this.router.push(`/book-detail/${bookId}`).catch((err) => console.log(err));
    }
  },
};
</script>

<style>
</style>