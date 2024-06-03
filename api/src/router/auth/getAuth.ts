// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "@/config/db";

import { userSchema } from "@/models/user";
import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";
import { verifyJWT } from "@/middleware/verifyJWT";
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
                    schema: ResponseSchema.extend({
                        body: z.object({ authenticatedUser: userSchema }),
                    }),
                },
            },
            description: "Valid session",
        },
        400: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "User not found",
        },
        401: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Unauthorized",
        },
        403: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Forbidden",
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
            return formattedResponse(c, 400, getAuthRoute.responses[400].description);

        return formattedResponse(c, 200, getAuthRoute.responses[200].description, {
            authenticatedUser: authenticatedUser,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, getAuthRoute.responses[500].description);
    }
};
