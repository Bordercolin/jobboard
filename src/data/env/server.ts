import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().min(1),
    DB_NAME: z.string().min(1),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      const { DB_PASSWORD, DB_USER, DB_HOST, DB_PORT, DB_NAME, ...rest } = val;
      return {
        DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        ...rest,
      };
    })
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
  },
});
