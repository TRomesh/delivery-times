import { groupData } from "../util/common";

describe("groupData", () => {
  test("should group items by storeId", () => {
    const items: DeliveryItem[] = [
      { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
      { orderId: 2, storeId: 2, date: "2024-01-02", seconds: 200 },
      { orderId: 3, storeId: 3, date: "2024-01-01", seconds: 150 },
    ];
    const expected: GroupedStores = {
      "2": [
        { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
        { orderId: 2, storeId: 2, date: "2024-01-02", seconds: 200 },
      ],
      "3": [{ orderId: 3, storeId: 3, date: "2024-01-01", seconds: 150 }],
    };

    expect(groupData(items)).toEqual(expected);
  });

  test("should handle empty arrays correctly", () => {
    expect(groupData([])).toEqual({});
  });
});
