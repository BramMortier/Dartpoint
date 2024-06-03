// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "@/config/db";

import { userSchema } from "@/models/user";
import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
const paramsSchema = z.object({
    userId: z.string().openapi({
        param: { name: "userId", description: "ID for user to retrieve", in: "path" },
        example: "46",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const getUserRoute = createRoute({
    method: "get",
    path: "/{userId}",
    summary: "Get a single user by their ID",
    request: {
        params: paramsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema.extend({
                        body: z.object({ user: userSchema }),
                    }),
                },
            },
            description: "Successfully retrieved user",
        },
        404: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "User doesn't exist",
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
    tags: ["Users"],
});

// =============================================================================
// Route handler
// =============================================================================
export const getUserHandler: Handler = async (c) => {
    try {
        const userIdParam = c.req.param("userId");

        const user = await db.user.findUnique({ where: { id: Number(userIdParam) } });

        if (!user) return formattedResponse(c, 404, getUserRoute.responses[404].description);

        return formattedResponse(c, 200, getUserRoute.responses[200].description, { user: user });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, getUserRoute.responses[500].description);
    }
};
