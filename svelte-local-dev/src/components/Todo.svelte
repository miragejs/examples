<script>
  import { createEventDispatcher } from "svelte";

  export let todo;

  const dispatch = createEventDispatcher();
  let localTodo = { ...todo };
  let isFocused;
  let hasChanges;

  async function save() {
    isFocused = false;
    if (hasChanges) {
      dispatch("change", localTodo);
    }
  }

  $: hasChanges =
    localTodo.text !== todo.text || localTodo.isDone !== todo.isDone;
</script>

<li
  class={`my-1 rounded focus:bg-white border-2 flex items-center relative
        ${isFocused ? 'bg-white border-gray-300' : 'border-transparent hover:bg-gray-200'}
        ${!isFocused && localTodo.isDone ? 'opacity-50' : ''}`}
  :data-testid={localTodo.text}>
  <input
    type="checkbox"
    bind:checked={localTodo.isDone}
    on:change={save}
    class="ml-2" />

  <form on:submit|preventDefault={save} class="relative w-full">
    <input
      type="text"
      bind:value={localTodo.text}
      placeholder="New Todo"
      on:focus={() => {
        isFocused = true;
      }}
      on:blur={save}
      class={`${localTodo.isDone && !isFocused ? 'line-through' : ''}
                    bg-transparent focus:outline-none px-3 py-1 block w-full`} />
  </form>
</li>
