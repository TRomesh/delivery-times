import { removeDuplicates } from "../util/common";

describe("Testing removeDuplicates", () => {
  test("should remove duplicate items based on orderId", () => {
    const items: DeliveryItem[] = [
      { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
      { orderId: 2, storeId: 3, date: "2024-01-01", seconds: 200 },
      { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
    ];
    const expected: DeliveryItem[] = [
      { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
      { orderId: 2, storeId: 3, date: "2024-01-01", seconds: 200 },
    ];
    expect(removeDuplicates(items)).toEqual(expected);
  });

  test("should return an empty array if given an empty array", () => {
    expect(removeDuplicates([])).toEqual([]);
  });

  test("should handle arrays without duplicates", () => {
    const items: DeliveryItem[] = [
      { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
    ];
    expect(removeDuplicates(items)).toEqual(items);
  });
});
