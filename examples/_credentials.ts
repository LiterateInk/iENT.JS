import { join } from "node:path";
import { config } from "dotenv";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

export const credentials = {
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!
};
