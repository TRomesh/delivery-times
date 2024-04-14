import { getCeilValue } from "../util/common";

describe("getCeilValue", () => {
  it("should return the floor value if the decimal part is less than 0.5", () => {
    expect(getCeilValue(483.4591836734694)).toBe(483);
    expect(getCeilValue(100.1)).toBe(100);
    expect(getCeilValue(5.4999999)).toBe(5);
  });

  it("should return the ceil value if the decimal part is 0.5 or more", () => {
    expect(getCeilValue(483.5)).toBe(484);
    expect(getCeilValue(100.9999)).toBe(101);
    expect(getCeilValue(5.5)).toBe(6);
  });
});
