<template>
  <li class="todos-list__item">
    {{ title }}
  </li>
</template>

<script>
export default {
  name: 'todo',
  props: [
    'title'
  ]
}
</script>

<style lang="scss">

</style>
