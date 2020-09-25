# Vue CLI Local Dev and Cypress Testing

This app is set up with Mirage for both local development and UI testing with Cypress.

The Mirage server is in [src/server.js](./src/server.js). The Cypress spec is in [cypress/integration/example.spec.js](./cypress/integration/example.spec.js).

## How to use

Pull down the repo and install deps:

```sh
git clone git@github.com:miragejs/examples.git
cd examples/vue-cli-local-dev-and-cypress
yarn
```

To run this app in development against a local Mirage server:

```sh
yarn serve
```

To run the Cypress tests:

```sh
yarn e2e
```
