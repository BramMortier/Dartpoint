// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { pusher } from "../../config/pusher";
import { validateRequest } from "../../middleware/requestValidator";
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
        example: "112",
    }),
    friendId: z.string().openapi({
        param: {
            name: "friendId",
            description: "ID for request receiver",
            in: "path",
        },
        example: "8",
    }),
});

const requestSchema = friendRequestSchema
    .pick({
        userId: true,
        friendId: true,
        isAccepted: true,
    })
    .partial();

// =============================================================================
// Route defenition
// =============================================================================
export const patchFriendRequestRoute = createRoute({
    method: "patch",
    path: "{userId}/friend-requests/{friendId}",
    summary: "Update the status of a friend request",
    request: {
        params: paramsSchema,
        body: {
            content: {
                "application/json": {
                    schema: requestSchema,
                },
            },
            description: "Updated status of the friend request",
        },
    },
    middleware: [validateRequest(requestSchema)],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema,
                },
            },
            description: "Successfully updated status of friend request",
        },
        422: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
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
export const patchFriendRequestHandler: Handler = async (c) => {
    try {
        const userIdParam = c.req.param("userId");
        const friendIdParam = c.req.param("friendId");

        const body = await c.req.json();

        const newFriend = await db.user.findUnique({ where: { id: Number(friendIdParam) } });

        const updatedRequest = await db.userFriends.update({
            where: {
                userId_friendId: {
                    userId: Number(userIdParam),
                    friendId: Number(friendIdParam),
                },
            },
            data: {
                isAccepted: body.isAccepted,
            },
        });

        pusher.trigger(`friend-requests-${userIdParam}`, "accepted-request", {
            newFriend: newFriend,
        });

        return formattedSuccesResponse(c, 200, patchFriendRequestRoute.responses[200].description, {
            updatedRequest: updatedRequest,
        });
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, patchFriendRequestRoute.responses[500].description);
    }
};
