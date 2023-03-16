<template>
  <div class="tabs" >
    <div class="tab-item">
      书城
    </div>
    <div class="tab-item">
      书架
    </div>
    <div class="tab-item">
      我的
    </div>
  </div>
</template>

<script>

export default {
  name:'Tabs',
  props: {
    actice: {
      type: Number,
      default: 0,
    }, 
    modules: {
      type: Array,
      default: [],
    },
    routes: {
      type: Array,
      default: [],
    },
  },
  setup(){
    
  }
};
</script>

<style  scoped>

.tabs {
  position:fixed;
  bottom: 0;
  left:0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-shadow:  0px -3px 5px -5px #eee;;
}
.tab-item {
  flex:1;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tab-item:active,.tab-item:hover {
  background-color:cornsilk;
}
</style>