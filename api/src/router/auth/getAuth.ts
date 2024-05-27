// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "../../config/db";

import { userSchema } from "../../models/user";
import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";
import { verifyJWT } from "../../middleware/verifyJWT";
import { decode } from "hono/jwt";

// =============================================================================
// Route defenition
// =============================================================================
export const getAuthRoute = createRoute({
    method: "get",
    path: "/",
    summary: "Get the authenticated user",
    middleware: [verifyJWT()],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ user: userSchema }),
                    }),
                },
            },
            description: "Valid session",
        },
        400: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "User not found",
        },
        401: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Unauthorized",
        },
        403: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Forbidden",
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
    tags: ["Auth"],
});

export const getAuthHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const authenticatedUser = await db.user.findUnique({
            where: { id: decodedToken.payload.sub },
        });

        if (!authenticatedUser)
            return formattedErrorResponse(c, 400, getAuthRoute.responses[400].description);

        return formattedSuccesResponse(c, 200, getAuthRoute.responses[200].description, {
            user: authenticatedUser,
        });
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, getAuthRoute.responses[500].description);
    }
};
