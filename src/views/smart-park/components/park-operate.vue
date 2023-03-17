<template>
  <div id="bigScreen">
    <div class="header">智慧园区</div>
    <div class="main">
      <div class="left">
        <div class="cityEvent">
          <h3>
            <span>热气球控制</span>
          </h3>
          <h1 @click="toggleAction(0)">
            <img class="icon" :src="seqIcon" alt="" />
            <span>设置热气球以横穿园区的动画显示</span>
          </h1>
          <h1 @click="toggleAction(1)">
            <img class="icon" :src="seqIcon" alt="" />
            <span>设置热气球以环绕园区进行运动</span>
          </h1>

          <div class="footerBorder"></div>
        </div>

        <div class="cityEvent">
          <h3>
            <span>相机控制</span>
          </h3>
          <h1 @click="toggleCamera('default')">
            <img class="icon" :src="seqIcon" alt="" />
            <span>默认的相机视角</span>
          </h1> 
          <h1 @click="toggleCamera('carcamera_Orientation')">
            <img class="icon" :src="seqIcon" alt="" />
            <span>设置相机追随汽车导览园区</span>
          </h1>
          <h1 @click="toggleCamera('rightcamera_Orientation')">
            <img class="icon" :src="seqIcon" alt="" />
            <span>查看汽车司机视角</span>
          </h1>

          <div class="footerBorder"></div>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import eventHub from "@/utils/eventHub";
import { ref } from "vue";
import seqIcon from "@/assets/images/smart-park/bar.svg";
const props = defineProps(["dataInfo", "eventList"]);
const imgs:{[key:string]:string} = {
  电力: new URL("@/assets/textures/smart-city/tag/e.png",import.meta.url).href,
  火警: new URL("@/assets/textures/smart-city/tag/fire.png",import.meta.url).href,
  治安: new URL("@/assets/textures/smart-city/tag/jingcha.png",import.meta.url).href,
};

const toFixInt = (num:number) => {
  return num.toFixed(0);
};
const currentActive = ref<number>();


const toggleAction = (i:number) => {
  console.log(i);
  eventHub.emit("actionClick", i);
};

const toggleCamera = (name:string) => {
  console.log(name);
  eventHub.emit("toggleCamera", name);
};

onMounted(()=>{

})
</script>
<style lang="scss" scoped>
#bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}

.header {
  /* width: 1920px;
        height: 100px; */

  width: 19.2rem;
  height: 1rem;
  line-height: 1rem;
  background-image: url(@/assets/images/smart-city/bg/title.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: rgb(226, 226, 255);
  font-size: 0.4rem;
}

.main {
  flex: 1;
  width: 19.2rem;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 4rem;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/assets/images/smart-city/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.right {
  width: 4rem;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/assets/images/smart-city/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.cityEvent {
  position: relative;
  width: 3.5rem;
  /* height: 3rem; */
  margin-bottom: 0.5rem;
  background-image: url(@/assets/images/smart-city/bg/bg_img03.png);
  background-repeat: repeat;
}

.cityEvent::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.cityEvent::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}
.footerBorder {
  position: absolute;
  bottom: 0;
  bottom: 0;
  width: 3.5rem;
  height: 0.4rem;
}
.footerBorder::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.footerBorder::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.icon {
  width: 40px;
  height: 40px;
}

h1 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0.3rem;
  justify-content: space-between;
  font-size: 0.3rem;
  pointer-events: auto;
  cursor:pointer;
}
h3 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.3rem;
}

h1 > div {
  display: flex;
  align-items: center;
}
h1 span.time {
  font-size: 0.2rem;
  font-weight: normal;
}


</style>
