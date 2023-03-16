<template>
  <div class="page-container">
    
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        replace
        :to="{ name: 'home', params: { userId: 123 } }"
        icon="home-o"
        >书城</van-tabbar-item
      >
      <van-tabbar-item icon="search">书架</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script  lang="ts">
import { ref, watch, getCurrentInstance } from "vue";
import { Tabbar, TabbarItem } from "vant";
import { useRoute,useRouter } from "vue-router";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const route = useRoute();
    const router = useRouter();
    const navTitle = router.currentRoute.value.meta.title;

    const active = ref(0);
    console.log(proxy,route,router,router.currentRoute.value,navTitle);

    // 监听路由的变化
    // watch(
    //   () => route.path,
    //   () => {
    //     proxy.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0;
    //   }
    // );
    return { active,navTitle};
  },
};
</script>

<style>
</style>