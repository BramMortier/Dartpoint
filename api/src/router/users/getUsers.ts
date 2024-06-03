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
// Route defenition
// =============================================================================
export const getUsersRoute = createRoute({
    method: "get",
    path: "/",
    summary: "Get a list of all users",
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema.extend({
                        body: z.object({ users: z.array(userSchema) }),
                    }),
                },
            },
            description: "Successfully retrieved users",
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
export const getUsersHandler: Handler = async (c) => {
    try {
        const users = await db.user.findMany();

        return formattedResponse(c, 200, getUsersRoute.responses[200].description, {
            users: users,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, getUsersRoute.responses[500].description);
    }
};
