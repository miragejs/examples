import Vue from 'vue'
import App from './App.vue'
import { Server, Model, Factory, JSONAPISerializer } from '@miragejs/server';


Vue.config.productionTip = false

let server = new Server({
  models: {
    user: Model
  },
  factories: {
    user: Factory.extend({
      name(i) {
        return `User ${i}`;
      }
    })
  },
  serializers: {
    application: JSONAPISerializer
  },
  scenarios: {
    default(server) {
      server.createList('user', 10);
    }
  },
  baseConfig() {
    this.namespace = 'api';
    this.get('/users');
    this.passthrough();
  }
});

window.server = server;

new Vue({
  render: h => h(App),
}).$mount('#app')
