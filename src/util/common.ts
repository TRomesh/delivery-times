export const removeDuplicates = (data: DeliveryItem[]): DeliveryItem[] => {
  const occurence = new Set<number>();
  return data.filter((item) => {
    if (occurence.has(item.orderId)) {
      return false;
    } else {
      occurence.add(item.orderId);
      return true;
    }
  });
};

export const groupData = (data: DeliveryItem[]): GroupedStores => {
  const stores: GroupedStores = {};
  const occurence = new Set<number>();
  data.forEach((item) => {
    if (occurence.has(item.storeId)) {
      stores[item.storeId]?.push(item);
    } else {
      occurence.add(item.storeId);
      stores[item.storeId] = [item];
    }
  });
  return stores;
};

export const storeAverages = (storesData: GroupedStores): StoreAverage[] => {
  return Object.entries(storesData).map(([storeId, deliveries]) => {
    const totalDeliveries = deliveries.length;
    const totalSeconds = deliveries.reduce(
      (total, current) => total + current.seconds,
      0
    );
    const averageDeliveryTime = totalSeconds / totalDeliveries;

    return {
      storeId: parseInt(storeId),
      deliveries: totalDeliveries,
      averageSeconds: getCeilValue(averageDeliveryTime),
    };
  });
};

export const getCeilValue = (value: number) => {
  const floorValue = Math.floor(value);
  return value - floorValue < 0.5 ? floorValue : Math.ceil(value);
};
