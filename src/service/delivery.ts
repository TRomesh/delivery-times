import axios from "axios";
import { eachDayOfInterval, format } from "date-fns";
import type NodeCache from "node-cache";
import { groupData, removeDuplicates, storeAverages } from "../util/common";

const BASE_URL =
  "https://europe-west3-getgaston-test.cloudfunctions.net/hometestDeliveries";

export class DeliveryService {
  private cache: NodeCache;

  constructor(cache: NodeCache) {
    this.cache = cache;
  }

  async calculateAverageDeliveryStatsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<StoreAverage[]> {
    // all deliveries for given startDate and endDate
    const deliveries = await this.fetchDeliveryDataForDateRange(
      startDate,
      endDate
    );
    // group deliveries by store
    const groupedStores = groupData(deliveries);
    // calculate average from grouped deliveries
    const storeAverageData = storeAverages(groupedStores);

    return storeAverageData;
  }

  private async fetchDeliveryDataForDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<DeliveryItem[]> {
    // gets an array of dates between the dateRange and endDate
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    // loop through the dataRange and fetchDeliveryData of each date
    const fetchDeliveryDataPromises = dateRange.map((date) =>
      this.fetchDeliveryData(date)
    );
    const dataArray = await Promise.all(fetchDeliveryDataPromises);
    // flat the nested arrays
    const data = dataArray.flat();
    // remove duplicates
    return removeDuplicates(data);
  }

  private async fetchDeliveryData(date: Date): Promise<DeliveryItem[]> {
    // Using date as the cache key
    const cacheKey = format(date, "yyyy-MM-dd");
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      // Retrieving delivery data from cache
      return cachedData as DeliveryItem[];
    }
    // Fetch data from API
    const deliveries = await this.fetchFromApi(cacheKey);
    // Setting delivery data to cache
    this.cache?.set(cacheKey, deliveries);
    return deliveries;
  }

  private async fetchFromApi(dateString: string): Promise<DeliveryItem[]> {
    const response = await axios.get<DeliveryItem[]>(`${BASE_URL}`, {
      params: { date: dateString },
    });
    return response.data;
  }
}
