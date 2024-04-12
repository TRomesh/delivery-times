import { NodeCache } from "node-cache";

declare global {
  namespace Express {
    interface Request {
      cache: NodeCache;
    }
  }

  interface DeliveryItem {
    orderId: number;
    storeId: number;
    date: string;
    seconds: number;
  }

  interface DeliveryResponse {
    timePeriod: [string, string];
    storeAverages: StoreAverage[];
  }

  interface StoreAverage {
    storeId: number;
    deliveries: number;
    averageSeconds: number;
  }

  type GroupedStores = Record<string, DeliveryItem[]>;
}
