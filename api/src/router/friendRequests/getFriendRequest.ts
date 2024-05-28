// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "../../config/db";

import { friendRequestSchema } from "../../models/friendRequest";
import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";
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
        example: "73",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const getFriendRequestRoute = createRoute({
    method: "get",
    path: "/{friendId}",
    summary: "Get a single friend request",
    request: {
        params: paramsSchema,
    },
    middleware: [verifyJWT()],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ requests: z.array(friendRequestSchema) }),
                    }),
                },
            },
            description: "Successfully retrieved friend request",
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
export const getFriendRequestHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const friendIdParam = c.req.param("friendId");

        const request = await db.userFriends.findUnique({
            where: {
                userId_friendId: {
                    userId: decodedToken.payload.sub,
                    friendId: Number(friendIdParam),
                },
            },
        });

        return formattedSuccesResponse(c, 200, getFriendRequestRoute.responses[200].description, {
            request: request,
        });
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, getFriendRequestRoute.responses[500].description);
    }
};
