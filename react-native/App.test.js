// src/__tests__/App.test.js
import React from "react";
import { render, waitForElement, waitFor } from "@testing-library/react-native";
import App from "./App";
import { makeServer } from "./server";
import { Response } from "miragejs";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

it("shows a message if there are no users", async () => {
  // Don't create any users

  const { findByTestId } = render(<App />);

  await expect(findByTestId("no-users")).resolves.toHaveTextContent(
    "No users!"
  );
});

it("shows the users from our server", async () => {
  server.create("user", { name: "Luke" });
  server.create("user", { name: "Leia" });

  const { getByTestId } = render(<App />);

  await waitFor(() => expect(getByTestId("user-1-name")));

  expect(getByTestId("user-1-name")).toHaveTextContent("Luke");
  expect(getByTestId("user-2-name")).toHaveTextContent("Leia");
});

it("handles error responses from the server", async () => {
  // Override Mirage's route handler for /users, just for this test
  server.get("/api/users", () => {
    return new Response(
      500,
      {},
      {
        error: "The database is on vacation.",
      }
    );
  });

  const { findByTestId } = render(<App />);

  await expect(findByTestId("server-error")).resolves.toHaveTextContent(
    "The database is on vacation."
  );
});
