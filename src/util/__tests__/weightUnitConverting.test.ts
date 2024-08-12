import {
  convertKgsToLbs,
  convertLbsToKgs,
  roundKgs,
} from "../weightUnitConverting";

describe("convertLbsToKgs", () => {
  it("converts pounds to kilograms", () => {
    expect(convertLbsToKgs(22)).toBeCloseTo(9.979, 2);
    expect(convertLbsToKgs(50)).toBeCloseTo(22.6796, 2);
  });
});

describe("convertKgsToLbs", () => {
  it("converts kilograms to pounds with rounding", () => {
    expect(convertKgsToLbs(10)).toBe(22);
    expect(convertKgsToLbs(15)).toBe(33);
    expect(convertKgsToLbs(20)).toBe(44);
  });
});

describe("roundKgs", () => {
  it("rounds kilograms to two decimal places", () => {
    expect(roundKgs(22.45)).toBe(22.45);
    expect(roundKgs(89.965)).toBe(89.97);
    expect(roundKgs(22)).toBe(22.0);
  });
});
