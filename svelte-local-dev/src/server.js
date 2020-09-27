import { Server } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    seeds(server) {
      server.db.loadData({
        todos: [
          { text: "Buy groceries", isDone: false },
          { text: "Walk the dog", isDone: false },
          { text: "Do laundry", isDone: false }
        ]
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/todos", ({ db }) => {
        return db.todos;
      });

      this.patch("/todos/:id", (schema, request) => {
        let todo = JSON.parse(request.requestBody).data;

        return schema.db.todos.update(todo.id, todo);
      });

      this.post("/todos", (schema, request) => {
        let todo = JSON.parse(request.requestBody).data;

        return schema.db.todos.insert(todo);
      });

      this.delete("/todos/:id", (schema, request) => {
        return schema.db.todos.remove(request.params.id);
      });
    }
  });

  window.server = server;

  return server;
}
