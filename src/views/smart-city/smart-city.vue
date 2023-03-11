<template>
<div class="smart-city" ref="smartCity">
  <city-scene></city-scene>
  <operate-scene :dataInfo="dataInfo" :eventList="eventList"></operate-scene>
</div>
</template>
<script lang="ts" setup>
import { getSmartCityInfo } from '@/api/smart-city-api';
import { AxiosError, AxiosResponse } from 'axios';
import gsap from "gsap";
import dayjs from 'dayjs'
// 全屏控制
import { useScreenFull } from "@/hooks/useScreenFull"
import renderer from './renderer';
const dataInfo = reactive<{ [key: string]: { number: number, name: string, unit: string } }>({
  iot: { number: 0, name: '', unit: '' },
  event: { number: 0, name: '', unit: '' },
  power: { number: 0, name: '', unit: '' },
  test: { number: 0, name: '', unit: '' },
});
const smartCity = ref<Element>()


onMounted(() => {
  //   双击 渲染画面进行全屏切换
  useScreenFull(smartCity.value, "dblclick")
  changeInfo();
  getEventList();
  // setInterval(() => {
  //   changeInfo();
  //   getEventList();
  // }, 10000);
});
const changeInfo = async () => {
  // let res = await getSmartCityInfo().catch((error:AxiosError)=>{
  //   console.log(error);
  //   // throw new Error(error.message);

  // }) ;
  dataInfo.iot = { number: 55, name: '', unit: '' };
  dataInfo.event = { number: 45, name: '', unit: '' };
  dataInfo.power = { number: 66, name: '', unit: '' };
  dataInfo.test = { number: 554, name: '', unit: '' };
  gsap.to(dataInfo['iot'], {
    number: 55,
    duration: 1,
  });
  // console.log(res);
  // dataInfo.iot = res.data.data.iot;
  // dataInfo.event = res.data.data.event;
  // dataInfo.power = res.data.data.power;
  // dataInfo.test = res.data.data.test;
  console.log(dataInfo);

  // for (let key in dataInfo) {
  //   dataInfo[key].name = res.data.data[key].name;
  //   dataInfo[key].unit = res.data.data[key].unit;
  //   gsap.to(dataInfo[key], {
  //     number: res.data.data[key].number,
  //     duration: 1,
  //   });
  // }

  // console.log(dataInfo);
};

const eventList = ref<{[key:string]:string}[]>([]);
const getEventList = () => {
  // let result = await getSmartCityList();
  // eventList.value = result.data.list;
  // console.log(result.data.list);
  eventList.value = [
    {
      name:'电力',
      time:dayjs(new Date()).format("YYYY-MM-DDD"),
      type:'INFO'
    },
    {
      name:'火警',
      time:dayjs(new Date()).format("YYYY-MM-DDD"),
      type:'INFO'
    },
    {
      name:'治安',
      time:dayjs(new Date()).format("YYYY-MM-DDD"),
      type:'INFO'
    }
  ]
  console.log(eventList.value);
  
};

</script>
<style lang="scss" scoped></style>
