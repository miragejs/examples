import { makeServer } from "../../src/server";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

it("shows a loading message", () => {
  cy.visit("/");

  cy.get("[data-testid=loading]").should("be.visible");
});

it("shows a message if there are no todos", () => {
  cy.visit("/");

  cy.get("[data-testid='no-todos']").should("be.visible");
});

it("can create a todo", () => {
  cy.visit("/");

  cy.get("[data-testid='new-todo-form'] input").type("Walk the dog{enter}");

  cy.get("[data-testid='saving']").should("be.visible");

  cy.get("[data-testid='todo'] input[type='checkbox']").should(
    "not.be.checked"
  );
  cy.get("[data-testid='todo'] input[type='text']").should(
    "have.value",
    "Walk the dog"
  );

  cy.should(() => {
    expect(server.db.todos).to.have.lengthOf(1);
    expect(server.db.todos[0].text).to.equal("Walk the dog");
  });
});

it("shows existing todos", () => {
  server.createList("todo", 3);

  cy.visit("/");

  cy.get("[data-testid='todo']").should("have.lengthOf", 3);
});

it("can complete a todo", () => {
  server.create("todo", { text: "Todo 1", isDone: false });
  server.create("todo", { text: "Todo 2", isDone: false });

  cy.visit("/");

  cy.get("[data-testid='todo'] input[type='checkbox']")
    .eq(1)
    .check();

  cy.get("[data-testid='todo'] input[type='checkbox']")
    .eq(1)
    .should("be.checked");

  cy.get("[data-testid='todo'] input[type='checkbox']")
    .first()
    .should("not.be.checked");

  cy.should(() => {
    expect(server.db.todos[1].isDone).to.be.true;
  });
});
