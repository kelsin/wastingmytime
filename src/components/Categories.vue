<template>
  <section>
    <h1>To-Do Items</h1>
    <draggable element="ul" class="category-list">
      <category title="Uncategorized" />
      <category v-for="category in categories" :key="category.id" :title="category.title" :id="category.id" />
      <li>
        <form v-on:submit.prevent="newCategory">
          <label for="categoryName">Create new category</label>
          <input name="categoryName" id="categoryName" type="text" v-model.trim="newTitle" placeholder="Category Name" />
          <input type="submit" value="Add Category" />
        </form>
      </li>
    </draggable>
  </section>
</template>

<script>
import Category from './Category'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'categories',
  components: {
    category: Category,
    draggable
  },
  data: function () { return { newTitle: '' } },
  computed: mapState(['categories']),
  methods: {
    newCategory: function (e) {
      if (this.newTitle !== '') {
        this.$store.dispatch({ type: 'addCategory', title: this.newTitle })
        this.newTitle = ''
      }
    }
  }
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
