<template>
  <div class="container">
    <div class="logo">
      <a href="https://www.e-f-a.org/">
        <img src="./assets/images/logo.svg" alt="European Free Alliance" />
      </a>
    </div>
    <FeeCalculator />
  </div>
</template>

<script setup>
import FeeCalculator from './components/FeeCalculator.vue'
</script>

<style lang="scss">
@import './assets/scss/app';

.container {
  max-width: 700px;
  margin: 0 auto;
}

.logo {
  margin: 2rem 0;

  img {
    width: 150px;
  }
}
</style>
