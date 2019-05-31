<template>
  <div id="app">
    <li v-for="user in users" v-bind:key="user.attributes.name">
      {{ user.attributes.name }}
    </li>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    users: []
  }),
  created: function () {
    fetch('/api/users')
      .then(response => response.json())
      .then(json => this.users = json.data);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
