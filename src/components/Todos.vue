<template>
  <ul class="todos-list category-list__sublist">
      <todo v-for="todo in todos" :key="todo.id" :title="todo.title" /> <!-- todos-list__item -->
      <li>
        <form v-on:submit.prevent="newTodo">
          <label :for="'newTodo' + catId">Add new to-do</label>
          <input type="text" :id="'newTodo' + catId" :name="'newTodo' + catId" v-model.trim="newTitle" placeholder="To-do" />
          <input type="submit" value="Add to-do" />
        </form>
      </li>
  </ul>
</template>

<script>
import Todo from './Todo'

export default {
  name: 'todos',
  components: {
    todo: Todo
  },
  props: [
    'todos',
    'catId'
  ],
  data: function () { return { newTitle: '' } },
  methods: {
    newTodo: function (e) {
      if (this.newTitle !== '') {
        this.$store.dispatch({ type: 'addTodo', catId: this.catId, todo: { title: this.newTitle } })
        this.newTitle = ''
      }
    }
  }
}
</script>

<style lang="scss">
.todos-list {
  &__item { padding-top: 0.25em; padding-bottom: 0.25em; }
}
</style>
