<script>
  import { onMount } from "svelte";
  import Todo from "./Todo.svelte";
  let isLoading = true;
  let newTodo = { text: "", isDone: false };
  let todos = [];
  let pendingOps = [];

  async function createTodo() {
    const operationId = Symbol();
    pendingOps = [...pendingOps, operationId];
    let index = todos.length;
    let todo = { ...newTodo, id: index + 1 };
    todos = [...todos, { ...todo }];
    newTodo = { text: "", isDone: false };
    const res = await fetch(`/api/todos`, {
      method: "post",
      body: JSON.stringify({ data: todo })
    });
    todo = await res.json();

    todos[index] = todo;
    todos = todos;
    pendingOps = pendingOps.filter(id => id !== operationId);
  }

  async function saveTodo({ detail: todo }) {
    const operationId = Symbol();
    pendingOps = [...pendingOps, operationId];
    let index = todos.findIndex(t => t.id === todo.id);
    todos[index] = todo;
    await fetch(`/api/todos/${todo.id}`, {
      method: "patch",
      body: JSON.stringify({ data: todo })
    });
    pendingOps = pendingOps.filter(id => id !== operationId);
  }

  async function deleteCompleted() {
    const operationId = Symbol();
    pendingOps = [...pendingOps, operationId];
    let completedTodos = todos.filter(t => t.isDone);
    let remainingTodos = todos.filter(t => !t.isDone);
    todos = remainingTodos;
    await Promise.all(
      completedTodos.map(todo =>
        fetch(`/api/todos/${todo.id}`, {
          method: "delete"
        })
      )
    );
    pendingOps = pendingOps.filter(id => id !== operationId);
  }

  onMount(async () => {
    const res = await fetch("/api/todos");
    todos = await res.json();
    isLoading = false;
  });

  $: isSaving = pendingOps.length > 0;
  $: done = todos.filter(todo => todo.isDone).length;
  $: remaining = todos.filter(todo => !todo.isDone).length;
  $: total = todos.length;
</script>

<div class="max-w-sm px-4 py-6 mx-auto bg-white rounded shadow-lg">
  <div class="flex items-center justify-between px-3">
    <h1 class="text-2xl font-bold">Todos</h1>

    <div class="text-blue-500">
      {#if isSaving}
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1
            4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1z" />
        </svg>
      {/if}
    </div>
  </div>

  <div class="mt-6">
    {#if isLoading}
      <p class="px-3 text-gray-500">Loading...</p>
    {:else}
      <div class="px-3">
        <form on:submit|preventDefault={createTodo}>
          <input
            type="text"
            bind:value={newTodo.text}
            placeholder="New todo"
            class="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded
            shadow focus:outline-none" />
        </form>
      </div>

      <ul class="mt-8">
        {#each todos as todo (todo.id)}
          <Todo {todo} on:change={saveTodo} />
        {/each}
      </ul>

      <div
        class="flex justify-between px-3 mt-12 text-sm font-medium text-gray-500">
        {#if todos.length}
          <p>{done} / {total} complete</p>
        {/if}
        {#if done}
          <button
            on:click={deleteCompleted}
            class="font-medium text-blue-500 focus:outline-none
            focus:text-blue-300">
            Clear completed
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>
