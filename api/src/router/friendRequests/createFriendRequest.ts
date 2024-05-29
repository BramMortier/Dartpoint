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
import { verifyJWT } from "../../middleware/verifyJWT";
import { decode } from "hono/jwt";

// =============================================================================
// Request Schemas
// =============================================================================
const requestSchema = z.object({
    friendId: z.string(),
    isAccepted: z.boolean(),
});

// =============================================================================
// Route defenition
// =============================================================================
export const createFriendRequestRoute = createRoute({
    method: "post",
    path: "/",
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
    middleware: [validateRequest(requestSchema), verifyJWT()],
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
        409: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema.extend({
                        isAccepted: z.boolean(),
                    }),
                },
            },
            description: "Request is already pending or accepted",
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
    tags: ["Friend requests"],
});

// =============================================================================
// Route handler
// =============================================================================
export const createFriendRequestHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const body = await c.req.json();

        const requestSender = await db.user.findUnique({ where: { id: decodedToken.payload.sub } });
        const requestReciever = await db.user.findUnique({ where: { dartpointId: body.friendId } });

        if (!requestReciever)
            return formattedErrorResponse(
                c,
                400,
                createFriendRequestRoute.responses[400].description
            );

        const duplicateRequest = await db.userFriends.findUnique({
            where: {
                userId_friendId: {
                    userId: requestReciever.id,
                    friendId: decodedToken.payload.sub,
                },
            },
        });

        if (duplicateRequest)
            return formattedErrorResponse(
                c,
                409,
                createFriendRequestRoute.responses[409].description,
                {
                    requestSender: requestReciever,
                    isAccepted: duplicateRequest.isAccepted,
                }
            );

        const createdRequest = await db.userFriends.create({
            data: {
                isAccepted: body.isAccepted,
                friendId: requestReciever.id,
                userId: decodedToken.payload.sub,
            },
        });

        pusher.trigger(`friend-requests-${requestReciever.id}`, "new-request", {
            requestSender: requestSender,
        });

        return formattedSuccesResponse(
            c,
            200,
            createFriendRequestRoute.responses[200].description,
            { createdRequest: createdRequest }
        );
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, createFriendRequestRoute.responses[500].description);
    }
};
