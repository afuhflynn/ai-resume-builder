// scripts/seed.ts (Modified)

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
// Import dependencies needed for the adapter
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

config();

// === ADD ADAPTER SETUP HERE ===
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
// ==============================

// Now initialize with the adapter and config
const prisma = new PrismaClient({
  adapter, // Pass the adapter object
  log: process.env.NODE_ENV === "development" ? ["query"] : [], // Optional, but good to keep consistent
});

export { prisma };
