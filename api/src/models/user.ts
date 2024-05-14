import { z } from "@hono/zod-openapi";

export const userSchema = z
    .object({
        id: z.string(),
        displayName: z.string(),
        email: z.string(),
        password: z.string(),
        country: z.string().optional(),
        guest: z.boolean().default(false),
    })
    .openapi("User");

export type User = z.infer<typeof userSchema>;
