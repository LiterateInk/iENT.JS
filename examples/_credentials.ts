import { join } from "node:path";
import { config } from "dotenv";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

export const credentials = {
  password: process.env.PASSWORD!,
  username: process.env.USERNAME!
};
