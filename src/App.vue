<template>
  <div id="app">
    <header>
      <h1 class="heading heading--site-title">Wasting My <img class="heading__image" src="./assets/clock.svg" alt="Time" /></h1>
    </header>
    <router-view></router-view>
    <footer>
      <p>Clock by Shuaib Usman Yusuf from the Noun Project</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body { font-family: 'Open Sans'; }
.heading { font-family: 'priori-sans'; font-weight: 100;
  &--site-title { text-transform:uppercase; margin: 0; line-height: 1; font-size: 2rem; text-align: center; }
  &__image { vertical-align: middle; width: 150px; height: 150px; display: block; margin-left: auto; margin-right: auto; }
}
</style>
