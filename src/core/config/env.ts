import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),

  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  SCHOOL_NAME_EN: z.string(),
  SCHOOL_ADDRESS: z.string(),

  JWT_EXPIRES_IN: z.string().optional(),
});

export const env = envSchema.parse(process.env);
