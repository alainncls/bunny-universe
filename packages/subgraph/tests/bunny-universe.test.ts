import {
  afterAll,
  assert,
  beforeAll,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";
import { Address } from "@graphprotocol/graph-ts";
import { handleAffiliateSell } from "../src/bunny-universe";
import { createAffiliateSellEvent } from "./bunny-universe-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    const affiliate = Address.fromString(
      "0x0000000000000000000000000000000000000001",
    );
    const newAffiliateSellEvent = createAffiliateSellEvent(affiliate);
    handleAffiliateSell(newAffiliateSellEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AffiliateSell created and stored", () => {
    assert.entityCount("AffiliateSell", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AffiliateSell",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "affiliate",
      "0x0000000000000000000000000000000000000001",
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
