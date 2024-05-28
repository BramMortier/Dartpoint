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
// Route defenition
// =============================================================================
export const getFriendRequestsRoute = createRoute({
    method: "get",
    path: "/",
    summary: "Get a users outgoing and incomming friend requests",
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
    tags: ["Friend requests"],
});

// =============================================================================
// Route handler
// =============================================================================
export const getFriendRequestsHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const requests = await db.userFriends.findMany({
            where: {
                OR: [
                    { userId: Number(decodedToken.payload.sub) },
                    { friendId: Number(decodedToken.payload.sub) },
                ],
                NOT: { isAccepted: true },
            },
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
