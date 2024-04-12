import { Request, Response } from "express";
import { ZodError } from "zod";
import { format } from "date-fns";
import { DeliveryService } from "../service/delivery";
import querySchema from "../schema/querySchema";

export const deliveryAverages = async (req: Request, res: Response) => {
  try {
    // accessing the cache injected by the cahceMiddleware
    const cache = req.cache;
    // parsing and validating startDate and endDate using querySchema
    const { startDate, endDate } = querySchema.parse(req.query);
    const deliveryService = new DeliveryService(cache);
    const storeAverages =
      await deliveryService.calculateAverageDeliveryStatsByDateRange(
        startDate,
        endDate
      );
    res.status(200).json({
      timePeriod: [
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd"),
      ],
      storeAverages,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      // Handle Zod-specific validation errors
      res.status(400).json({
        message: "There was an error in your input.",
        errors: error.errors.map((err) => ({
          message: err.message,
        })),
      });
    } else {
      // Handle other kinds of unexpected errors
      res.status(500).send("Internal server error");
    }
  }
};
