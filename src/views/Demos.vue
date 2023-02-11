<template>
<div class="demos">
  <h2>demos</h2>
  {{ current }}
  <br>

  <button @click="switchDemo">Image:</button>
  <br>
  <Image v-if="current == 'Image'" src="../assets/vue.svg"></Image>

</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

let current = ref('')
const switchDemo = () =>{ current.value = 'Image' }
</script>
<style scoped>
.demos {
  width: 100vw;
  height: 100vh;
}
</style>
