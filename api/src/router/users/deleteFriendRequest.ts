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
            description: "ID for request sender",
            in: "path",
        },
        example: "46",
    }),
    friendId: z.string().openapi({
        param: {
            name: "friendId",
            description: "ID for request reciever",
            in: "path",
        },
        example: "73",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const deleteFriendRequestsRoute = createRoute({
    method: "delete",
    path: "/{userId}/friend-requests/{friendId}",
    summary: "Delete a friend request",
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
            description: "Successfully deleted request",
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
export const deleteFriendRequestsHandler: Handler = async (c) => {
    try {
        const userIdParam = c.req.param("userId");
        const friendIdParam = c.req.param("friendId");

        const deletedRequest = await db.userFriends.delete({
            where: {
                userId_friendId: {
                    userId: Number(userIdParam),
                    friendId: Number(friendIdParam),
                },
            },
        });

        return formattedSuccesResponse(
            c,
            200,
            deleteFriendRequestsRoute.responses[200].description,
            { deletedRequest: deletedRequest }
        );
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, deleteFriendRequestsRoute.responses[500].description);
    }
};
