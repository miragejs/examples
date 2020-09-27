# React Local Dev, React Testing Library, and Cypress Testing

This app is set up with Mirage for both local development and UI testing with Cypress.

The Mirage server is in [src/server.js](./src/server.js). The React Testing Library test is in [src/**tests**/App.test.js](./src/__tests__/App.test.js). The Cypress test is in [cypress/integration/app.spec.js](./cypress/integration/app.spec.js).

## How to use

Pull down the repo and install deps:

```sh
git clone git@github.com:miragejs/examples.git
cd examples/react-local-dev-and-cypress
yarn
```

To run this app in development against a local Mirage server:

```sh
yarn start
```

To run the React Testing Library tests:

```sh
yarn test
```

To run the Cypress tests:

```sh
yarn cypress:dev
```
