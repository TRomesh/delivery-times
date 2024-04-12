import { z } from "zod";

// uses Zod Schema for validation and parsing the string dates to Date types
const querySchema = z
  .object({
    startDate: z
      .string()
      .transform((date) => new Date(date))
      .refine((date) => !isNaN(date.getTime()), {
        message: "startDate must be a valid date",
      }),
    endDate: z
      .string()
      .transform((date) => new Date(date))
      .refine((date) => !isNaN(date.getTime()), {
        message: "endDate must be a valid date",
      }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "startDate must be before endDate",
  });

export default querySchema;
