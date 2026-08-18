import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // Both CLI and app will use the stable pooler in the cloud.
    url: env("DATABASE_URL"),
  },
});
