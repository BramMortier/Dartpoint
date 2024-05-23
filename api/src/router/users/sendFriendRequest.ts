// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
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

// =============================================================================
// Route defenition
// =============================================================================
export const sendFriendRequestRoute = createRoute({
    method: "post",
    path: "/friend-request",
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
export const sendFriendRequestHandler: Handler = async (c) => {
    try {
        const body = await c.req.json();

        const user = await db.user.findUnique({ where: { id: body.friendId } });
        if (!user) {
            return formattedErrorResponse(
                c,
                400,
                sendFriendRequestRoute.responses[400].description
            );
        }

        // TODO: check if friend request already is pending or accepted

        await db.userFriends.create({
            data: body,
        });

        return formattedSuccesResponse(c, 200, sendFriendRequestRoute.responses[200].description);
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, sendFriendRequestRoute.responses[500].description);
    }
};
