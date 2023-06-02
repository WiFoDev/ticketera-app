import z from "zod";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const envSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  SALT_ROUNDS: z.string().nonempty().transform(Number),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) return result.error.issues;
};
