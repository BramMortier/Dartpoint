// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { pusher } from "@/config/pusher";
import { validateRequest } from "@/middleware/requestValidator";
import { db } from "@/config/db";

import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";
import { verifyJWT } from "@/middleware/verifyJWT";
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
                    schema: ResponseSchema,
                },
            },
            description: "Successfully sent request",
        },
        422: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
        },
        409: {
            content: {
                "application/json": {
                    schema: ResponseSchema.extend({
                        body: z.object({ isAccepted: z.boolean() }),
                    }),
                },
            },
            description: "Request is already pending or accepted",
        },
        400: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Invalid friend code",
        },
        500: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
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

        if (!requestReciever || requestSender?.id === requestReciever?.id)
            return formattedResponse(c, 400, createFriendRequestRoute.responses[400].description);

        const incommingRequest = await db.userFriends.findUnique({
            where: {
                userId_friendId: {
                    userId: requestReciever.id,
                    friendId: decodedToken.payload.sub,
                },
            },
            include: { friend: true, user: true },
        });

        if (incommingRequest)
            return formattedResponse(c, 409, createFriendRequestRoute.responses[409].description, {
                incommingRequest: incommingRequest,
            });

        const outgoingRequest = await db.userFriends.findUnique({
            where: {
                userId_friendId: {
                    userId: decodedToken.payload.sub,
                    friendId: requestReciever.id,
                },
            },
            include: { friend: true, user: true },
        });

        if (outgoingRequest)
            return formattedResponse(c, 409, createFriendRequestRoute.responses[409].description, {
                outgoingRequest: outgoingRequest,
            });

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

        return formattedResponse(c, 200, createFriendRequestRoute.responses[200].description, {
            createdRequest: createdRequest,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, createFriendRequestRoute.responses[500].description);
    }
};
