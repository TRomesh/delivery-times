/// <reference path="../../global.d.ts" />

import { NextFunction, Request, Response } from "express";
import type NodeCache from "node-cache";

// Middleware to attach the cache instance to the request
export const cacheMiddleware =
  (cache: NodeCache) => (req: Request, _res: Response, next: NextFunction) => {
    if (cache) {
      req.cache = cache;
    }
    next();
  };
