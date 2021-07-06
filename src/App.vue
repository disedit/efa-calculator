<template>
  <div class="container">
    <div class="logo">
      <a href="https://www.e-f-a.org/">
        <img src="./assets/images/logo.svg" alt="European Free Alliance" />
      </a>
    </div>
    <FeeCalculator />
    <div class="disclaimer">
      <img src="./assets/images/ep.svg" alt="" width="80">
      <p>
        With Financial Support of the European Parliament.
        The information on this website concerns only the author, the European Parliament
        is not responsible for the use and content of the information.
      </p>
    </div>
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
    width: 125px;
  }
}

.disclaimer {
  display: flex;
  margin: 8rem 0 4rem;
  align-items: flex-end;

  img {
    margin-right: 1rem;
  }

  p {
    font-size: .85rem;
    margin: 0;
  }
}
</style>
