# React Native Local Dev and React Testing Library

This React Native app is set up with Mirage for both local development and UI testing with React Testing Library.

The Mirage server is in [src/server.js](./server.js). The test is in [App.test.js](./App.test.js).

## How to use

Pull down the repo and install deps:

```sh
git clone git@github.com:miragejs/examples.git
cd examples/react-native
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
