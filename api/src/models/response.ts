import { z } from "@hono/zod-openapi";

export const ErrorResponseSchema = z
    .object({
        code: z.number(),
        message: z.string(),
        error: z.object({}).optional(),
    })
    .openapi("ErrorResponse");

export const SuccesResponseSchema = z
    .object({
        code: z.number(),
        message: z.string(),
        data: z.object({}).optional(),
    })
    .openapi("SuccesResponse");
