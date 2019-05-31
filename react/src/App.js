import React, { Component } from 'react';
import './App.css';
import { Server, Model, Factory, JSONAPISerializer } from '@miragejs/server';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(json => this.setState({ users: json.data }));
  }

  render() {
    return (
      <ul>
        {this.state.users.map(user =>
          <li key={user.id}>
            {user.attributes.name}
          </li>
        )}
      </ul>
    );
  }
}

export default App;
