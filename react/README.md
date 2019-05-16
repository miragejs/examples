# Mirage React demo

To see the demo,

1. Clone this repo
2. `cd demos/react`
3. `yarn install`
4. `yarn start`

Check out the top of [App.js](https://github.com/miragejs/demos/blob/master/react/src/App.js).

## Usage in your own React app

Install Mirage:

```sh
yarn add -D @miragejs/server@2.0.0-beta.4

# Or use npm
npm install -D @miragejs/server@2.0.0-beta.4
```

Import and use Mirage!

```js
// App.js
import React, { Component } from 'react';
import Server from '@miragejs/server';

let server = new Server();
server.get('/users', () => (
  {
    data: [
      { id: '1', name: 'Sally' },
      { id: '2', name: 'John' },
      { id: '3', name: 'Susan' },
    ]
  }
));

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
```
