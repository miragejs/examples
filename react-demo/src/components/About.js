import React from "react";

export default function() {
  return (
    <div>
      <h1 className="text-xl font-bold">About this app</h1>
      <p className="mt-4">
        This is an SPA made with{" "}
        <a
          className="underline font-medium text-blue-500"
          href="https://miragejs.com"
        >
          Mirage
        </a>{" "}
        and{" "}
        <a
          className="underline font-medium text-blue-500"
          href="https://reactjs.org"
        >
          React
        </a>
        . It has two routes to help demonstrate how Mirage's in-memory database
        enables realistic data fetching and persistence during a single
        application session.
      </p>
      <p className="mt-4">
        Mirage's state is reset whenever the application is reloaded.
      </p>
      <p className="mt-4">
        <a
          className="border-b border-blue-500 font-medium text-blue-500"
          href="https://github.com/miragejs/react-demo"
        >
          View the code on GitHub →
        </a>
      </p>
    </div>
  );
}
