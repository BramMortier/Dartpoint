// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";

import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedSuccesResponse } from "../../utils/formattedResponse";
import { verifyJWT } from "../../middleware/verifyJWT";

// =============================================================================
// Route defenition
// =============================================================================
export const getSecretRoute = createRoute({
    method: "get",
    path: "/",
    summary: "Get a little secret",
    middleware: [verifyJWT()],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ secret: z.string() }),
                    }),
                },
            },
            description: "Yo momma fat!",
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
    tags: ["Protected"],
});

// =============================================================================
// Route handler
// =============================================================================
export const getSecretHandler: Handler = async (c) => {
    return formattedSuccesResponse(c, 200, getSecretRoute.responses[200].description);
};
