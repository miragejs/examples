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

  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.text()).to.include("ad");
  });
});
