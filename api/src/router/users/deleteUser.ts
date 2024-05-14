// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "../../config/db";

import { userSchema } from "../../models/user";
import { SuccesResponseSchema, ErrorResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
const paramsSchema = z.object({
    id: z.string().openapi({
        param: { name: "id", description: "ID for user to delete", in: "path" },
        example: "65",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const deleteUserRoute = createRoute({
    method: "delete",
    path: "/{id}",
    summary: "Delete a single user by their ID",
    request: {
        params: paramsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ deletedUser: userSchema }),
                    }),
                },
            },
            description: "Successfully deleted user",
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
    tags: ["Users"],
});

// =============================================================================
// Route handler
// =============================================================================
export const deleteUserHandler: Handler = async (c) => {
    const userId = c.req.param("id");

    try {
        const deletedUser = await db.user.delete({
            where: {
                id: Number(userId),
            },
        });

        return formattedSuccesResponse(
            c,
            200,
            deleteUserRoute.responses[200].description,
            deletedUser
        );
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, deleteUserRoute.responses[500].description);
    }
};
