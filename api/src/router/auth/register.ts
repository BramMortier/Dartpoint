// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { validateRequest } from "../../middleware/requestValidator";
import { db } from "../../config/db";

import { userSchema } from "../../models/user";
import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
export const requestSchema = userSchema.pick({
    displayName: true,
    dartpointId: true,
    email: true,
    password: true,
    country: true,
});

// =============================================================================
// Route defenition
// =============================================================================
export const registerRoute = createRoute({
    method: "post",
    path: "/register",
    summary: "Register a new user account",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: requestSchema,
                },
            },
            description: "Data for creating a new user",
        },
    },
    middleware: [validateRequest(requestSchema)],
    responses: {
        201: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ user: userSchema }),
                    }),
                },
            },
            description: "Successfully created user",
        },
        422: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
        },
        409: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "An account with this email already exists",
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

// =============================================================================
// Route handler
// =============================================================================
export const registerHandler: Handler = async (c) => {
    try {
        const body = await c.req.json();

        const duplicateUser = await db.user.findUnique({ where: { email: body.email } });
        if (duplicateUser)
            return formattedErrorResponse(c, 409, registerRoute.responses[409].description);

        body.password = await Bun.password.hash(body.password, {
            algorithm: "argon2id",
            memoryCost: 4,
            timeCost: 3,
        });

        const createdUser = await db.user.create({
            data: body,
        });

        return formattedSuccesResponse(c, 201, registerRoute.responses[201].description, {
            user: createdUser,
        });
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, registerRoute.responses[500].description);
    }
};
