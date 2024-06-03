// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { pusher } from "../../config/pusher";
import { validateRequest } from "../../middleware/requestValidator";
import { db } from "../../config/db";

import { friendRequestSchema } from "../../models/friendRequest";
import { ResponseSchema } from "../../models/response";
import { formattedResponse } from "../../utils/formattedResponse";
import { verifyJWT } from "../../middleware/verifyJWT";
import { decode } from "hono/jwt";

// =============================================================================
// Request Schemas
// =============================================================================
const paramsSchema = z.object({
    friendId: z.string().openapi({
        param: {
            name: "friendId",
            description: "ID for request receiver",
            in: "path",
        },
        example: "8",
    }),
});

const requestSchema = friendRequestSchema.pick({
    isAccepted: true,
});

// =============================================================================
// Route defenition
// =============================================================================
export const patchFriendRequestRoute = createRoute({
    method: "patch",
    path: "/{friendId}",
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
    middleware: [validateRequest(requestSchema), verifyJWT()],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Successfully updated status of friend request",
        },
        422: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
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
export const patchFriendRequestHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const friendIdParam = c.req.param("friendId");

        console.log("user:", decodedToken.payload.sub);
        console.log("fiend:", friendIdParam);

        const body = await c.req.json();

        const newFriend = await db.user.findUnique({ where: { id: Number(friendIdParam) } });

        const updatedRequest = await db.userFriends.update({
            where: {
                userId_friendId: {
                    userId: Number(friendIdParam),
                    friendId: Number(decodedToken.payload.sub),
                },
            },
            data: {
                isAccepted: body.isAccepted,
            },
        });

        pusher.trigger(`friend-requests-${decodedToken.payload.sub}`, "accepted-request", {
            newFriend: newFriend,
        });

        return formattedResponse(c, 200, patchFriendRequestRoute.responses[200].description, {
            updatedRequest: updatedRequest,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, patchFriendRequestRoute.responses[500].description);
    }
};
