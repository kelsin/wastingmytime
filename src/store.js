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
      if (id === undefined || id === '') {
        return state.todos.filter(todo => !todo.hasOwnProperty('categoryId'))
      } else {
        return state.todos.filter(todo => todo.categoryId === id)
      }
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
    },
    removeCategory (state, categoryId) {
      let categoryIndex = state.categories.findIndex(function (category) { return category.id === categoryId })
      if (categoryIndex > -1) {
        state.categories.splice(categoryIndex, 1)
      }

      state.todos = state.todos.map(function (todo) {
        if (todo.categoryId === categoryId) {
          delete todo.categoryId
        }
        return todo
      })
    },
    removeTodo (state, todoId) {
      let todoIndex = state.todos.findIndex(function (todo) { return todo.id === todoId })
      if (todoIndex > -1) {
        state.todos.splice(todoIndex, 1)
      }
    },
    changeCategory (state, payload) {
      let todo = state.todos.find(function (todo) { todo.id === payload.todoId })
      todo.categoryId = payload.newCategoryId
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
    },
    removeCategory ({commit}, categoryId) {
      commit('removeCategory', categoryId)
    },
    removeTodo ({commit}, todoId) {
      commit('removeTodo', todoId)
    },
    changeCategory ({commit}, payload) {
      commit({type: 'changeCategory', ...payload})
    }
  }
})
