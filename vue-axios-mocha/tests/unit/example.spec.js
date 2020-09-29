import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { makeServer } from "../../src/server";

describe("HelloWorld.vue", () => {
  let server;

  before(() => {
    server = makeServer({ environment: "test" });
  });

  after(() => {
    server.shutdown();
  });

  it("works", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.text()).to.include("ad");
  });
});
