import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import NodeCache from "node-cache";
import morgan from "morgan";
import cors from "cors";

import { APP_PORT } from "./config";
import { cacheMiddleware } from "./middleware/cahceMiddleware";
import { deliveryAverages } from "./controller/deliveryAverages";

const app = express();
// set cache time to 24 hours to make sure that an API call happens only once in a day
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Apply the cache middleware globally
app.use(cacheMiddleware(cache));

app.get("/ping", (_: Request, res: Response) => {
  res.status(200).send("pong 🏓");
});

app.get("/deliveryAverages", deliveryAverages);

app.listen(APP_PORT, async () => {
  console.log(`🚀 Server is running on port ${APP_PORT}`);
});
