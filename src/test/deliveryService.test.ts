import { DeliveryService } from "../service/delivery";
import axios from "axios";
import NodeCache from "node-cache";
// Mock axios
jest.mock("axios");
// Mock the entire NodeCache module
jest.mock("node-cache", () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    flushAll: jest.fn(),
  }));
});

describe("DeliveryService", () => {
  let deliveryService: DeliveryService;
  let mockCache: NodeCache;

  beforeEach(() => {
    // Reset all mocks
    jest.resetAllMocks();
    mockCache = new (NodeCache as any)();
    deliveryService = new DeliveryService(mockCache);
  });

  describe("calculateAverageDeliveryStatsByDateRange", () => {
    it("should calculate averages correctly from cached data", async () => {
      const startDate = new Date(2021, 0, 1);
      const endDate = new Date(2021, 0, 3);
      const mockDeliveries = [
        { orderId: 3, storeId: 1, date: "2024-01-01", seconds: 150 },
        { orderId: 4, storeId: 1, date: "2024-01-01", seconds: 350 },
        { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
        { orderId: 2, storeId: 3, date: "2024-01-01", seconds: 200 },
        { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
      ];

      // Mocking the behavior of fetching delivery data for each date
      axios.get = jest.fn().mockResolvedValue({ data: mockDeliveries });
      mockCache.get = jest.fn().mockResolvedValue(mockDeliveries); // simulate cache miss

      const result =
        await deliveryService.calculateAverageDeliveryStatsByDateRange(
          startDate,
          endDate
        );

      expect(result).toEqual([
        { storeId: 1, deliveries: 2, averageSeconds: 250 },
        { storeId: 2, deliveries: 1, averageSeconds: 150 },
        { storeId: 3, deliveries: 1, averageSeconds: 200 },
      ]);
      expect(axios.get).toHaveBeenCalledTimes(0); // check if api calls are done after fetching from cache
      expect(mockCache.get).toHaveBeenCalledTimes(3);
    });

    it("should calculate averages correctly from fetched data", async () => {
      const startDate = new Date(2021, 0, 1);
      const endDate = new Date(2021, 0, 3);
      const mockDeliveries = [
        { orderId: 3, storeId: 1, date: "2024-01-01", seconds: 150 },
        { orderId: 4, storeId: 1, date: "2024-01-01", seconds: 350 },
        { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
        { orderId: 2, storeId: 3, date: "2024-01-01", seconds: 200 },
        { orderId: 1, storeId: 2, date: "2024-01-01", seconds: 150 },
      ];
      // Mocking the behavior of fetching delivery data for each date
      axios.get = jest.fn().mockResolvedValue({ data: mockDeliveries });
      mockCache.get = jest.fn().mockImplementation((key: string) => undefined); // simulate cache miss
      mockCache.set = jest
        .fn()
        .mockImplementation((key: string, value: any) => {});

      const result =
        await deliveryService.calculateAverageDeliveryStatsByDateRange(
          startDate,
          endDate
        );

      expect(result).toEqual([
        { storeId: 1, deliveries: 2, averageSeconds: 250 },
        { storeId: 2, deliveries: 1, averageSeconds: 150 },
        { storeId: 3, deliveries: 1, averageSeconds: 200 },
      ]);
      expect(axios.get).toHaveBeenCalledTimes(3); // check if api calls are done after fetching from empty cache
      expect(mockCache.set).toHaveBeenCalledTimes(3); // check if cache is set
    });
  });
});
