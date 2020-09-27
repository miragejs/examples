<script>
  import { Router, Link, Route } from "svelte-routing";
  import About from "./components/About.svelte";
  import Todos from "./components/Todos.svelte";

  export let url = "";

  const propagateClass = ({ baseClass, activeClass }) => ({ isCurrent }) => {
    return { class: `${baseClass}${isCurrent ? " " + activeClass : ""}` };
  };
</script>

<Router {url}>
  <div class="text-gray-900 bg-gray-300 h-screen pt-8">
    <div class="max-w-sm mx-auto">
      <header class="pb-8">
        <Link
          to="/"
          getProps={propagateClass({
            baseClass: 'pb-1 mr-4',
            activeClass: 'border-b-2 border-gray-700'
          })}>
          Home
        </Link>
        <Link
          to="/about"
          getProps={propagateClass({
            baseClass: 'pb-1',
            activeClass: 'border-b-2 border-gray-700'
          })}>
          About
        </Link>
      </header>

      <Route path="about" component={About} />
      <Route path="/">
        <Todos />
      </Route>
    </div>
  </div>
</Router>
