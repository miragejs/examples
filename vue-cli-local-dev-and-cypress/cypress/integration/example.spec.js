import { makeServer } from "../../src/server";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

it("shows the users from our server", () => {
  server.logging = true;
  server.db.loadData({
    todos: [{ text: "Buy groceries", isDone: false }],
  });

  cy.visit("/");

  cy.get('[data-testid="Buy groceries"]')
    .get("input")
    .should("not.value", "Buy groceries");
});
