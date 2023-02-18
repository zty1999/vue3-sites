<template>
  <div class="three-demos">
    <div class="demo-list animate__animated animate__fadeInUp">
      <div class="demo-item hvr-grow" @click="showDemo('starry-sky')">
        <p class="demo-item-title hvr-grow">starry-sky</p>
      </div>
      <div class="demo-item hvr-grow" @click="showDemo('snow-flake')">
        <p class="demo-item-title hvr-grow">snow-flake</p>
      </div>
      <div class="demo-item hvr-grow" @click="showDemo('spiral-galaxy')">
        <p class="demo-item-title hvr-grow">spiral-galaxy</p>
      </div>
    </div>
  </div>


  <Teleport to="body">
    <transition name="animate__animated animate__fadeInUp"  enter-active-class="animate__animated animate__fadeInUp animate__faster"
            leave-active-class="animate__animated animate__fadeOutDown animate__faster">
        <div class="overlay" v-if="currentShowDemo">
          <div class="demo-dialog modal " >
          <div class="modal-header">
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
            <template v-if="currentShowDemo == 'starry-sky'">
              <component :is="(StarrySky)"></component>
            </template>
            <template v-if="currentShowDemo == 'snow-flake'">
              <component :is="(SnowFlake)"></component>
            </template>
            <template v-if="currentShowDemo == 'spiral-galaxy'">
              <component :is="(SpiralGalaxy)"></component>
            </template>
            
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
import { Ref } from 'vue';
enum Demo {
  'starry-sky' = '星空',
  'snow-flake' = '雪花',
}
let demos: { [index: string]: string } = {
  'starry-sky': '星空',
  'snow-flake': '雪花',
}
let router = useRouter()
let currentShowDemo: Ref<string> = ref('')
let demoTitle: Ref<string> = ref('')

const showDemo = (demoName: string) => {
  console.log('show demo' + demoName, router);
  currentShowDemo.value = demoName
  demoTitle.value = demos[demoName]
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
  justify-content: center;
  padding: 110px 60px;

  .demo-item {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 10px;
    background-color: rgba(60, 60, 60, .8);
    border-radius: 10px;
    cursor: pointer;

  }
}

.demo-item-title {
  line-height: 200px;
  margin: 0;
  font-size: 24px;
  white-space: nowrap;
  color: #61a9ff;

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
</style>
