<template>
  <div>
    <div class="main">
      <side-nav :navsData="navsData"></side-nav>
      <router-view :path="$route.path"></router-view>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import * as configJson from "../routes/config.json";
  import 'highlight.js/styles/zenburn.css';

  const navsData = JSON.parse(JSON.stringify(configJson)).default;

  export default Vue.extend({
    data(){
      return {
        navsData
      }
    }
  })
</script>
<style scoped>

</style>