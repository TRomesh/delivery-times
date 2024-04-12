import { storeAverages } from "../util/common";

describe("storeAverages", () => {
  test("should calculate average delivery times for each store", () => {
    const storesData: GroupedStores = {
      2: [
        { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 100 },
        { orderId: 2, storeId: 2, date: "2024-01-01", seconds: 200 },
      ],
      3: [{ orderId: 3, storeId: 3, date: "2024-01-01", seconds: 300 }],
    };
    const expected = [
      { storeId: 2, deliveries: 2, averageSeconds: 150 },
      { storeId: 3, deliveries: 1, averageSeconds: 300 },
    ];
    expect(storeAverages(storesData)).toEqual(expected);
  });

  test("should return empty array if no data is present", () => {
    expect(storeAverages({})).toEqual([]);
  });
});
