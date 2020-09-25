import React from "react";
import {
  render,
  waitForElement,
  waitForElementToBeRemoved,
  fireEvent
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RawApp from "../App";
import { makeServer } from "../server";
import { SWRConfig, cache } from "swr";

const App = () => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <RawApp />
  </SWRConfig>
);

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
  cache.clear();
});

it("shows a loading message", () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("loading")).toBeInTheDocument();
});

it("shows a message if there are no todos", async () => {
  const { getByTestId } = render(<App />);
  await waitForElementToBeRemoved(() => getByTestId("loading"));

  expect(getByTestId("no-todos")).toBeInTheDocument();
});

it("can create a todo", async () => {
  const { getByTestId } = render(<App />);
  await waitForElementToBeRemoved(() => getByTestId("loading"));

  const newTodoForm = await waitForElement(() => getByTestId("new-todo-form"));
  userEvent.type(newTodoForm.querySelector("input"), "Walk the dog");
  fireEvent.submit(getByTestId("new-todo-form"));
  await waitForElementToBeRemoved(() => getByTestId("saving"));

  const todo = getByTestId("todo");
  expect(todo.querySelector('input[type="checkbox"]').checked).toBe(false);
  expect(todo.querySelector('input[type="text"]').value).toBe("Walk the dog");
  expect(server.db.todos.length).toBe(1);
  expect(server.db.todos[0].text).toBe("Walk the dog");
});

it("shows existing todos", async () => {
  server.createList("todo", 3);

  const { getByTestId, getAllByTestId } = render(<App />);
  await waitForElementToBeRemoved(() => getByTestId("loading"));

  expect(getAllByTestId("todo")).toHaveLength(3);
});

it("can complete a todo", async () => {
  server.create("todo", { text: "Todo 1", isDone: false });
  server.create("todo", { text: "Todo 2", isDone: false });

  const { getByTestId, getAllByTestId } = render(<App />);
  await waitForElementToBeRemoved(() => getByTestId("loading"));
  const todos = getAllByTestId("todo");
  userEvent.click(todos[1].querySelector("input[type='checkbox']"));

  expect(getByTestId("completed-todos")).toHaveTextContent("1 / 2 complete");

  await waitForElementToBeRemoved(() => getByTestId("saving"));

  expect(todos[0].querySelector('input[type="checkbox"]').checked).toBe(false);
  expect(todos[1].querySelector('input[type="checkbox"]').checked).toBe(true);
  expect(server.db.todos[1].isDone).toBe(true);
});

it("can clear completed todos", async () => {
  server.create("todo", { text: "Todo 1", isDone: true });
  server.create("todo", { text: "Todo 2", isDone: false });

  const { getByTestId } = render(<App />);
  await waitForElementToBeRemoved(() => getByTestId("loading"));
  expect(getByTestId("completed-todos")).toHaveTextContent("1 / 2 complete");

  userEvent.click(getByTestId("clear-completed"));
  await waitForElementToBeRemoved(() => getByTestId("saving"));

  expect(getByTestId("completed-todos")).toHaveTextContent("0 / 1 complete");
  expect(server.db.todos).toHaveLength(1);
});
