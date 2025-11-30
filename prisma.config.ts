// prisma.config.ts
import { defineConfig, env } from "prisma/config";

import { config } from "dotenv";

config();

export default defineConfig({
  // Point to your schema file
  schema: "prisma/schema.prisma",

  // Define the datasource connection here instead of schema.prisma
  datasource: {
    url: env("DATABASE_URL"),
  },

  // Optional: If you use migrations
  migrations: {
    path: "prisma/migrations",
  },
});
