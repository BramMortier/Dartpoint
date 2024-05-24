// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { pusher } from "../../config/pusher";
import { validateRequest } from "../../middleware/requestValidator";
import { db } from "../../config/db";

import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
const requestSchema = z.object({
    isAccepted: z.boolean(),
    userId: z.number(),
    friendId: z.number(),
});

// TODO: use scheme and .pick() instead of hard coded

// =============================================================================
// Route defenition
// =============================================================================
export const createFriendRequestRoute = createRoute({
    method: "post",
    path: "/friend-requests",
    summary: "Send a friend request to a user",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: requestSchema,
                },
            },
            description: "Data for sending a friend request",
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
            description: "Successfully sent request",
        },
        422: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
        },
        400: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Invalid friend code",
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
export const createFriendRequestHandler: Handler = async (c) => {
    try {
        const body = await c.req.json();

        const requestSender = await db.user.findUnique({ where: { id: body.userId } });
        const requestReciever = await db.user.findUnique({ where: { id: body.friendId } });

        if (!requestReciever || !requestSender) {
            return formattedErrorResponse(
                c,
                400,
                createFriendRequestRoute.responses[400].description
            );
        }

        // TODO: check if friend request already is pending or accepted

        await db.userFriends.create({
            data: body,
        });

        pusher.trigger("friend-requests", "new-request", { requestSender: requestSender });

        return formattedSuccesResponse(c, 200, createFriendRequestRoute.responses[200].description);
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, createFriendRequestRoute.responses[500].description);
    }
};
