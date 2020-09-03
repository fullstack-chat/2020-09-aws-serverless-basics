<template>
  <v-app>
    <div class="main">
      <div class="wrapper">
        <h1>// TODOer</h1>
        <v-text-field label="Add a todo"
          v-model="todoBeingAdded"
          @keydown.enter="add" ></v-text-field>
        <v-checkbox v-for="todo in todos"
          v-model="todo.isDone"
          :label="todo.name"
          :key="todo.id"
          :class="{'done': todo.isDone }"
          @click="update(todo)" ></v-checkbox>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import { v4 } from 'uuid'

const apiBase = 'https://qtut8l2wec.execute-api.us-east-1.amazonaws.com/staging/todo'

export default {
  name: 'App',
  created: function() {
    this.fetch()
  },
  data: function () {
    return {
      todoBeingAdded: '',
      todos: []
    }
  },
  methods: {
    fetch: async function () {
      let opts = {
        method: 'get',
        url: apiBase
      }
      let res = await axios(opts)
      this.todos = res.data
    },

    add: async function () {
      let data = {
        id: v4(),
        name: this.todoBeingAdded,
        isDone: false
      }

      let opts = {
        method: 'post',
        url: apiBase,
        data
      }
      await axios(opts)

      this.todos.push(data)
      this.todoBeingAdded = ''
    },

    update: async function (todo) {
      let data = {
        id: todo.id,
        name: todo.name,
        isDone: todo.isDone
      }

      let opts = {
        method: 'put',
        url: `${apiBase}?id=${todo.id}`,
        data: todo
      }
      await axios(opts)
    }
  }
};
</script>

<style lang="sass">
.main
  height: 100%
  width: 100%
  display: flex
  justify-content: center

  .wrapper
    width: 700px

.done
  label
    text-decoration: line-through

.v-messages
  height: 0px !important
  visibility: hidden !important
  display: none !important

.v-input__slot
  margin-bottom: 0 !important
</style>
