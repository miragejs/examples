import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { makeServer } from "../../src/server";
import axios from "axios";
import XhrAdapter from "axios/lib/adapters/xhr";
axios.defaults.adapter = XhrAdapter;

describe("HelloWorld.vue", () => {
  let server;

  before(() => {
    server = makeServer({ environment: "test" });
  });

  after(() => {
    server.shutdown();
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
