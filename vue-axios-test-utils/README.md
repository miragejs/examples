# Vue Local Dev and Vue Test Utils with Axios

This Vue app is set up with Mirage for both local development and UI testing with Vue Test Utils.

It uses Axios for its network requests, and the test shows how to force Axios to use `window.XMLHttpRequest` so Mirage can intercept the Vue app's network requests.

The Mirage server is in [src/server.js](./src/server.js). The test is in [tests/unit/example.spec.js](./tests/unit/example.spec.js).

## How to use

Pull down the repo and install deps:

```sh
git clone git@github.com:miragejs/examples.git
cd examples/vue-axios-test-utils
yarn
```

To run this app in development against a local Mirage server:

```sh
yarn serve
```

To run the Vue Test Utils test:

```sh
yarn test:unit
```
