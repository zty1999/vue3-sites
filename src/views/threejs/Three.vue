<template>
  <div class="three-demos">
    <div class="demo-list animate__animated animate__fadeInUp">
      <div class="demo-item hvr-grow" @click="value.path?toPage(value.path):showDemo(key+'')" v-for="(value,key) in demos" :key="key">
        <p class="demo-item-title hvr-grow">{{demos[key].title}}</p>
      </div>
      <!-- <div class="demo-item hvr-grow" @click="showDemo(key+'')" v-for="(value,key) in demos" :key="key">
        <p class="demo-item-title hvr-grow">{{demos[key].title}}</p>
      </div> -->
    </div>
  </div>


 <Teleport to="body">
    <transition name="animate__animated animate__fadeInUp"  enter-active-class="animate__animated animate__fadeInUp animate__faster"
            leave-active-class="animate__animated animate__fadeOutDown animate__faster">
        <div class="overlay" v-if="currentShowDemo">
          <div class="demo-dialog modal " >
          <div class="modal-header">
            <screenfull></screenfull>
            <div class="close-icon" @click="currentShowDemo = ''">
              <div class="close-icon-inner hvr-grow">
                <div class="la" style="transform: rotate(-45deg);">
                  <div></div>
                </div>
                <div class="lb" style="transform: rotate(45deg);">
                  <div></div>
                </div>
              </div>
            </div>
            <div class="modal-header-title primary-text ">{{ demoTitle }}</div>
          </div>
          <div class="modal-content">
            <component :is="demos[currentShowDemo].component"  showControls></component>
          </div>
        </div>
        </div>
    </transition>
  </Teleport> 




</template>
<script lang="ts" setup>
import StarrySky from '@/components/three-particles/starry-sky.vue';
import SnowFlake from '@/components/three-particles/snow-flake.vue';
import SpiralGalaxy from '@/components/three-particles/spiral-galaxy.vue';
import ImgToParticles from '@/views/threejs/image-to-particles/components/img-to-particles.vue';
import CarShowRoom from '@/views/threejs/car-showroom/components/three-car-showroom.vue';
import { Ref } from 'vue';
import { openWindow } from '@/router/util';


let demos: { [index: string]: {title:string,component?:any,path?:string} } = {
  'starry-sky': {
    title:'星空',
    component: StarrySky,
    path: '/three/starry-sky'

  },
  'snow-flake': {
    title:'雪花',
    component: SnowFlake,
    path: '/three/snow-flake'

  },
  'spiral-galaxy': {
    title:'臂旋星系',
    component: SpiralGalaxy,
    path: '/three/spiral-galaxy'

  },
  'image-to-particles': {
    title:'图片粒子化',
    component: ImgToParticles,
    path: '/three/image-to-particles'

  },
  'car-showroom': {
    title:'3d汽车展示',
    component: CarShowRoom,
    path: '/three/car-showroom'
  },
}
let router = useRouter()
let currentShowDemo: Ref<string> = ref('')
let demoTitle: Ref<string> = ref('')
const showDemo = (key: string) => {
  console.log('show demo' + key, router);
  currentShowDemo.value = key
  demoTitle.value = demos[key].title
}
const toPage = (path: string) => {
  console.log(path);
  let routeUrl = router.resolve({
          path: path,
          // query: {}
     });
  console.log(routeUrl);
  openWindow(routeUrl.href);
}
</script>
<style lang="scss" scoped>
.three-demos {
  width: 100vw;
  height: 100vh;

  background-color: rgb(39, 38, 38);

}

.demo-list {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  /* justify-content: center; */
  padding: 110px 60px;

  .demo-item {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: rgba(60, 60, 60, .8);
    border-radius: 10px;
    cursor: pointer;

  }
}

.demo-item-title {
  width: 100%;
  line-height: 200px;
  margin: 0;
  font-size: 24px;
  white-space: nowrap;
  color: #61a9ff;
  text-align: center;
}
.overlay {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index:99;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;

  &-header {
    position: relative;
    padding: 20px;

    &-title {
      text-align: center;
      font-size: 20px;
    }

    .close-icon {
      position: absolute;
      right: 0.8rem;
      top: 1.2rem;
      cursor: pointer;
      z-index: 30;
    }

    .close-icon-inner {
      width: 1.5rem;
      height: 1.5rem;
      position: relative;
      /* margin: 1.25rem; */

      .la,
      .lb {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;

        div {
          height: 1px;
          background: #ff906f;
        }
      }

      .la {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }

      .lb {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }


    }
  }

  &-content {
    padding: 20px;
    height: 600px;
  }
}

.demo-dialog {
  border-radius: 20px;
  border-color: #fff;
  background-color: #1e1e1e;
}

/* gradient text for modern browsers */
@supports (-webkit-background-clip: text) {

  .demo-item-title {
    background-image: $primary-color;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}



/* controls  */
:deep(.c) {
  input {
    height: 20px !important;
  }
}
</style>
