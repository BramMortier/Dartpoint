// =============================================================================
// Imports
// =============================================================================
import { z } from "@hono/zod-openapi";

// =============================================================================
// Schema(s)
// =============================================================================
export const friendRequestSchema = z
    .object({
        userId: z.number(),
        friendId: z.number(),
        isAccepted: z.boolean(),
    })
    .openapi("FriendRequest");

export type FriendRequest = z.infer<typeof friendRequestSchema>;
