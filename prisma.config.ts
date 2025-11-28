// prisma.config.ts
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Point to your schema file
  schema: "prisma/schema.prisma",

  // Define the datasource connection here instead of schema.prisma
  datasource: {
    url: "postgresql://postgres:postgres@localhost:8003/ai_resume_builder",
  },

  // Optional: If you use migrations
  migrations: {
    path: "prisma/migrations",
  },
});
