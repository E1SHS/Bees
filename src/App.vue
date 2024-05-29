<template>
  <router-view> </router-view>
</template>

<script setup>

</script>

<style lang="scss">
@import '@/assets/_bootswatch.scss';
@import '@/assets/_variables.scss';
@import 'bootstrap/dist/css/bootstrap.css';

body {
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  background: #eee;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a41111; 
  margin-top: 60px;
}
</style>
