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
$enable-rounded: false;
$primary: #80379b;
@import 'bootstrap/scss/bootstrap';

:root {
  --white: #fff;
  --accent-color: #{$primary};
  --accent-color-light: #{rgba($primary, .1)};
  --gray-light: #eee;
  --gray-dark: #777779;
  --box-shadow: 0 1.25rem 1.75rem 0 rgb(0 0 0 / 10%);
}

@font-face {
  font-family: Geogrotesque;
  src:
    local("Geogrotesque Regular"),
    local("Geogrotesque-Regular"),
    url("./assets/fonts/Geogrotesque-Medium.woff2") format("woff2"),
    url("./assets/fonts/Geogrotesque-Medium.woff") format("woff");
  font-weight: normal;
  font-style: normal
}

@font-face {
  font-family: Geogrotesque;
  src:
    local("Geogrotesque Bold"),
    local("Geogrotesque-Bold"),
    url("./assets/fonts/Geogrotesque-Bold.woff2") format("woff2"),
    url("./assets/fonts/Geogrotesque-Bold.woff") format("woff");
  font-weight: bold;
  font-style: normal
}

body {
  font-family: Geogrotesque, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--gray-dark);
}

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
