
<template>
  <Signup />
   <router-view />
</template>

<script setup lang="ts">
import SignupForm from './components/SignupForm.vue';
</script>
<style lang="scss" scoped>
// @import "./scss/variables";
// @import "./scss/bootstrap";
// @import "./scss/bootswatch"; 

@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;500;600;700&display=swap');

#app {
  -webkit-font-smothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a41111;
  margin-top: 60px;
}
body{
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  background: #eee;
}
</style>  