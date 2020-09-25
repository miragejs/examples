<template>
  <li
    :class="[
      {
        'bg-white border-gray-300': isFocused,
        'border-transparent hover:bg-gray-200': !isFocused,
        'opacity-50': !isFocused && localTodo.isDone
      },
      'rounded focus:bg-white border-2 flex items-center relative'
    ]"
    :data-testid="localTodo.text"
  >
    <input
      type="checkbox"
      v-model="localTodo.isDone"
      @change="save"
      class="ml-2"
    />

    <form @submit.prevent="save" class="relative w-full">
      <input
        type="text"
        v-model="localTodo.text"
        placeholder="New Todo"
        @focus="isFocused = true"
        @blur="save"
        :class="[
          {
            'line-through': localTodo.isDone && !isFocused
          },
          'bg-transparent focus:outline-none px-3 py-1 block w-full'
        ]"
      />
    </form>
  </li>
</template>

<script>
export default {
  props: ["todo"],

  data() {
    return {
      localTodo: { ...this.todo },
      isFocused: false
    };
  },

  watch: {
    todo: {
      handler() {
        this.localTodo = { ...this.todo };
      },
      deep: true
    }
  },

  computed: {
    hasChanges() {
      return (
        this.localTodo.text !== this.todo.text ||
        this.localTodo.isDone !== this.todo.isDone
      );
    }
  },

  methods: {
    async save() {
      this.isFocused = false;

      if (this.hasChanges) {
        this.$emit("change", this.localTodo);
      }
    }
  }
};
</script>
