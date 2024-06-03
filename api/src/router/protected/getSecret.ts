// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";

import { ResponseSchema } from "../../models/response";
import { formattedResponse } from "../../utils/formattedResponse";
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
                    schema: ResponseSchema.extend({
                        data: z.object({ secret: z.string() }),
                    }),
                },
            },
            description: "Yo momma fat!",
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
    tags: ["Protected"],
});

// =============================================================================
// Route handler
// =============================================================================
export const getSecretHandler: Handler = async (c) => {
    return formattedResponse(c, 200, getSecretRoute.responses[200].description);
};
