<template>
  <div class="hello">
    <h1>Users</h1>

    <p v-if="!users">Loading...</p>

    <ul v-else>
      <li
        v-for="user in users"
        v-bind:key="user.id"
        :data-test-id="`user-${user.id}`"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data() {
    return {
      users: null,
    };
  },

  async mounted() {
    let res = await axios.get("/api/users");

    this.users = res.data.users;
  },
};
</script>
