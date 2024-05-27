// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "../../config/db";

import { friendRequestSchema } from "../../models/friendRequest";
import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
const paramsSchema = z.object({
    userId: z.string().openapi({
        param: {
            name: "userId",
            description: "ID for user's friend requests te retrieve",
            in: "path",
        },
        example: "46",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const getFriendRequestsRoute = createRoute({
    method: "get",
    path: "/{userId}/friend-requests",
    summary: "Get a users outgoing and incomming friend requests",
    request: {
        params: paramsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ requests: z.array(friendRequestSchema) }),
                    }),
                },
            },
            description: "Successfully retrieved friend requests",
        },
        500: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Internal server error",
        },
    },
    tags: ["Users"],
});

// =============================================================================
// Route handler
// =============================================================================
export const getFriendRequestsHandler: Handler = async (c) => {
    try {
        const userIdParam = c.req.param("userId");

        const requests = await db.userFriends.findMany({
            where: { userId: Number(userIdParam) },
            include: { friend: true, user: true },
        });

        return formattedSuccesResponse(c, 200, getFriendRequestsRoute.responses[200].description, {
            requests: requests,
        });
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, getFriendRequestsRoute.responses[500].description);
    }
};
