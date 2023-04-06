<template>
<div class="home">
  <layout-header></layout-header>
  <v-tabs
      v-model="tab"
      bg-color="primary"
      align-tabs="end"
    >
      <v-tab :value="index" v-for="(item,index) in navs" :key="index" @click="toExtraUrl(item)">{{ item.title }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
</div>
</template>
<script lang="ts" setup>
import { openWindow } from '@/router/util';

const tab = ref(null);
const router = useRouter();
const route = useRoute();
const navs = ref([
  {
    path:'https://blog.intheway.cloud',
    title:'博客'
  }
])
const toExtraUrl = (nav:any) =>{
  console.log();
  
  openWindow( nav.path as string)
}
</script>
<style lang="scss" scoped>
.home {
  user-select:none;
}
.canvas-wrapper {
  /* position: fixed;
  left: 0;
  top: 0; */
  width: 100%;
  height: 100vh;
}

.intro-content {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  color: #fff;
  z-index: 10;
  overflow: hidden;
}

.intro-text {
  margin-top: 15%;
  font-size: 60px;
  text-align: center;
}
</style>
