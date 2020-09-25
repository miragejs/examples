<template lang="html">
  <div class="max-w-sm px-4 py-6 mx-auto bg-white rounded shadow-lg">
    <div class="flex items-center justify-between px-3">
      <h1 class="text-2xl font-bold">Todos</h1>

      <div class="text-blue-500">
        <svg v-if="isSaving" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1z"
          />
        </svg>
      </div>
    </div>

    <div class="mt-6">
      <p class="px-3 text-gray-500" v-if="isLoading">Loading...</p>

      <div v-else>
        <div class="px-3">
          <form @submit.prevent="createTodo">
            <input
              type="text"
              v-model="newTodo.text"
              placeholder="New todo"
              class="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded shadow focus:outline-none"
            />
          </form>
        </div>

        <ul class="mt-8">
          <todo
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @change="saveTodo"
            class="my-1"
          />
        </ul>

        <div
          class="flex justify-between px-3 mt-12 text-sm font-medium text-gray-500"
        >
          <p v-if="todos.length">{{ done }} / {{ total }} complete</p>
          <button
            @click="deleteCompleted"
            v-if="done"
            class="font-medium text-blue-500 focus:outline-none focus:text-blue-300"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Todo from "./Todo";

export default {
  components: { Todo },

  data() {
    return {
      isLoading: true,
      newTodo: {},
      todos: [],
      pendingOps: []
    };
  },

  computed: {
    isSaving() {
      return this.pendingOps.length > 0;
    },

    done() {
      return this.todos.filter(todo => todo.isDone).length;
    },

    remaining() {
      return this.todos.filter(todo => !todo.isDone).length;
    },

    total() {
      return this.todos.length;
    }
  },

  created() {
    axios.get("/api/todos").then(({ data }) => {
      this.isLoading = false;
      this.todos = data;
    });
  },

  methods: {
    async createTodo() {
      const operationId = Symbol();
      this.pendingOps.push(operationId);

      let todo = { ...this.newTodo };
      let index = this.todos.length;
      this.$set(this.todos, index, todo);
      this.newTodo = {};

      todo = await axios
        .post(`/api/todos`, { data: todo })
        .then(json => json.data);

      // Update client side cache with record from server
      this.$set(this.todos, index, todo);

      this.pendingOps = this.pendingOps.filter(id => id !== operationId);
    },

    async saveTodo(todo) {
      const operationId = Symbol();
      this.pendingOps.push(operationId);

      let index = this.todos.findIndex(t => t.id === todo.id);
      this.$set(this.todos, index, todo);

      await axios.patch(`/api/todos/${todo.id}`, { data: todo });

      this.pendingOps = this.pendingOps.filter(id => id !== operationId);
    },

    async deleteCompleted() {
      const operationId = Symbol();
      this.pendingOps.push(operationId);

      let completedTodos = this.todos.filter(t => t.isDone);
      let remainingTodos = this.todos.filter(t => !t.isDone);
      this.todos = remainingTodos;

      await Promise.all(
        completedTodos.map(todo => axios.delete(`/api/todos/${todo.id}`))
      );

      this.pendingOps = this.pendingOps.filter(id => id !== operationId);
    }
  }
};
</script>

<style lang="css" scoped></style>
