<template>
  <div class="hello">
    <h1>Users</h1>

    <ul>
      <li v-for="user in users" v-bind:key="user.id">{{ user.name }}</li>
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
  mounted() {
    axios
      .get("/api/users")
      .then(({ data }) => (this.users = data.users))
      .catch((e) => {
        console.log("heres the error");
        console.error(e);
      });
  },
};
</script>
