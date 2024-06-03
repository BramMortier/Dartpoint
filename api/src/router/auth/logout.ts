// =============================================================================
// Module imports
// =============================================================================
import { deleteCookie } from "hono/cookie";
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";

import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";

// =============================================================================
// Route defenition
// =============================================================================
export const logoutRoute = createRoute({
    method: "post",
    path: "/logout",
    summary: "Logout of a user account",
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Logout succesfull",
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

// =============================================================================
// Route handler
// =============================================================================
export const logoutHandler: Handler = async (c) => {
    try {
        deleteCookie(c, "token", {
            secure: true,
        });

        return formattedResponse(c, 200, logoutRoute.responses[200].description);
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, logoutRoute.responses[500].description);
    }
};
