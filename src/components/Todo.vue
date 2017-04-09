<template>
  <li class="todos-list__item">
    {{ title }} <button @click="remove">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'todo',
  methods: {
    remove: function () {
      this.$store.dispatch('removeTodo', this.id)
    }
  },
  props: [
    'title',
    'id'
  ]
}
</script>

<style lang="scss">

</style>
