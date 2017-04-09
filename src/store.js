import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v4'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersist({
    namespace: 'wasting-my-time-' + process.env.NODE_ENV,
    initialState: {}
  })],
  state: {
    categories: [
      {
        title: 'House',
        id: 1
      },
      {
        title: 'Shopping',
        id: 2
      },
      {
        title: 'Websites',
        id: 3
      }
    ],
    todos: [
      {
        title: 'Clean out fridge',
        id: 1,
        categoryId: 1
      },
      {
        title: 'Vacuum floor',
        id: 2,
        categoryId: 1
      },
      {
        title: 'Buy Caitlin a squishable witch cat',
        id: 3,
        categoryId: 2
      },
      {
        title: 'Wasting My Time',
        id: 4,
        categoryId: 3
      }
    ]
  },
  getters: {
    categoryCount: (state) => state.categories.length,
    todoCount: (state) => state.todos.length,
    getCategoryById: (state) => (id) => {
      return state.categories.find(category => category.id === id)
    },
    getTodosByCategoryId: (state) => (id) => {
      return state.todos.filter(todo => todo.categoryId === id)
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    addCategory (state, category) {
      delete category.type
      state.categories.push(category)
    },
    addTodo (state, todo) {
      delete todo.type
      state.todos.push(todo)
    }
  },
  actions: {
    addCategory ({commit}, payload) {
      let id = uuid()
      commit({ type: 'addCategory', id, ...payload })
    },
    addTodo ({commit}, payload) {
      let id = uuid()
      commit({ type: 'addTodo', id, ...payload })
    }
  }
})
