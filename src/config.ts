import dotenv from "dotenv";

dotenv.config();

/* App Config */
export const APP_PORT = process.env.APP_PORT || 8080;
export const BASE_URL = process.env.BASE_URL;
