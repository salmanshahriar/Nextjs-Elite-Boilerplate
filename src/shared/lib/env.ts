import { z } from "zod";

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
