<template>
  <li class="category-list__item category">
    <h2 class="category__title">{{ title }} <button @click="remove">Delete</button></h2>
    <todos :todos="todos" :categoryId="id" /> <!-- category-list__sublist -->
  </li>
</template>

<script>
import Todos from './Todos'

export default {
  name: 'category',
  components: {
    todos: Todos
  },
  computed: {
    todos () {
      return this.$store.getters.getTodosByCategoryId(this.id)
    }
  },
  methods: {
    remove: function () {
      this.$store.dispatch('removeCategory', this.id)
    }
  },
  props: [
    'title',
    'id'
  ]
}
</script>

<style lang="scss">
.category-list { list-style: none outside; margin: 0; padding: 0;
  &__item { border-bottom: 1px solid rgba(0,0,0,0.5); }
  &__sublist { list-style: none outside; margin: 0; padding: 0 0 0 2em;}
}

.category { padding-top: 0.5em; padding-bottom: 0.5em;
  &__title { margin: 0; }
}
</style>
