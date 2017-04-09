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
        id: 1,
        todos: [
          {
            title: 'Clean out fridge',
            id: 1
          },
          {
            title: 'Vacuum floor',
            id: 2
          }
        ]
      },
      {
        title: 'Shopping',
        id: 2,
        todos: [
          {
            title: 'Buy Caitlin a squishable witch cat',
            id: 3
          }
        ]
      },
      {
        title: 'Websites',
        id: 3,
        todos: [
          {
            title: 'Wasting My Time',
            id: 4
          }
        ]
      }
    ]
  },
  getters: {
    categoryCount: (state) => state.categories.length,
    todoCount (state) {
      return state.categories.reduce((total, category) => total + category.todos.length, 0)
    },
    getCategoryById: (state) => (id) => {
      return state.categories.find(category => category.id === id)
    },
    todos (state) {
      return state.categories.reduce((todos, category) => todos.concat(category.todos), [])
    },
    getTodoById: (state, getters) => (id) => {
      return getters.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    addCategory (state, category) {
      category.todos = []
      state.categories.push(category)
    },
    addTodo (state, payload) {
      state.categories.find(c => c.id === payload.catId).todos.push(payload.todo)
    }
  },
  actions: {
    addCategory ({commit, getters}, payload) {
      let id = uuid()
      commit({ type: 'addCategory', id, ...payload })
    },
    addTodo ({commit, getters}, payload) {
      payload.todo.id = uuid()
      commit({ type: 'addTodo', ...payload })
    }
  }
})
