import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { makeServer } from "../../src/server";

describe("HelloWorld.vue", () => {
  let server;
  let originalXMLHttpRequest = XMLHttpRequest;

  before(() => {
    server = makeServer({ environment: "test" });
    // Force node to use the monkey patched window.XMLHttpRequest
    // This needs to come after `makeServer()` is called.
    // eslint-disable-next-line no-global-assign
    XMLHttpRequest = window.XMLHttpRequest;
  });

  after(() => {
    server.shutdown();
    // Restore node's original window.XMLHttpRequest.
    // eslint-disable-next-line no-global-assign
    XMLHttpRequest = originalXMLHttpRequest;
  });

  it("shows users from the server", (done) => {
    server.create("user", { name: "Sam" });

    const wrapper = shallowMount(HelloWorld);

    setTimeout(() => {
      expect(wrapper.find('[data-test-id="user-1"]').text()).to.eq("Sam");
      done();
    }, 50);
  });
});
