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
        example: "65",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const deleteUserRoute = createRoute({
    method: "delete",
    path: "/{userId}",
    summary: "Delete a single user by their ID",
    request: {
        params: paramsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema.extend({
                        body: z.object({ deletedUser: userSchema }),
                    }),
                },
            },
            description: "Successfully deleted user",
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
export const deleteUserHandler: Handler = async (c) => {
    const userId = c.req.param("userId");

    try {
        const user = await db.user.findUnique({
            where: {
                id: Number(userId),
            },
        });

        if (!user) return formattedResponse(c, 404, deleteUserRoute.responses[404].description);

        const deletedUser = await db.user.delete({
            where: {
                id: Number(userId),
            },
        });

        return formattedResponse(c, 200, deleteUserRoute.responses[200].description, {
            deletedUser: deletedUser,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, deleteUserRoute.responses[500].description);
    }
};
