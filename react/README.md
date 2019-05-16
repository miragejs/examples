# Mirage React demo

Check out the top of [App.js](https://github.com/miragejs/demos/blob/master/react/src/App.js).

## Usage in your own React app

Install Mirage:

```sh
yarn install -D @miragejs/server@2.0.0-beta.4

# or npm install -D @miragejs/server@2.0.0-beta.4
```

Import and use Mirage!

```js
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
```
