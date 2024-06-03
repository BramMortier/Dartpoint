// =============================================================================
// Imports
// =============================================================================
import { z } from "@hono/zod-openapi";

// =============================================================================
// Schema(s)
// =============================================================================
export const boardSchema = z
    .object({
        id: z.number(),
        ownerId: z.number(),
        name: z.string(),
        code: z.string(),
        isVisible: z.boolean(),
        country: z.string(),
    })
    .openapi("Board");

export type Board = z.infer<typeof boardSchema>;
