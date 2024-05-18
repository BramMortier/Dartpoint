// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { Handler } from "hono";
import { SignatureKey } from "hono/utils/jwt/jws";
import { db } from "../../config/db";

import { userSchema } from "../../models/user";
import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
export const requestSchema = userSchema.pick({
    email: true,
    password: true,
});

type requestSchema = z.infer<typeof requestSchema>;

// =============================================================================
// Route defenition
// =============================================================================
export const loginRoute = createRoute({
    method: "post",
    path: "/login",
    summary: "Login to a user account",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: requestSchema,
                },
            },
            description: "Login credentials",
        },
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema.extend({
                        data: z.object({ accessToken: z.string() }),
                    }),
                },
            },
            description: "Successfull login",
        },
        422: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
        },
        400: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "No account associated with this email address",
        },
        401: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Incorrect password or email",
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
export const loginHandler: Handler = async (c) => {
    try {
        const body: requestSchema = await c.req.json();

        const user = await db.user.findUnique({ where: { email: body.email } });
        if (!user) return formattedErrorResponse(c, 400, loginRoute.responses[400].description);

        const validPassword = await Bun.password.verify(body.password, user.password);
        if (!validPassword)
            return formattedErrorResponse(c, 401, loginRoute.responses[401].description);

        const tokenPayload = {
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            nbf: Math.floor(Date.now() / 1000),
            iat: Math.floor(Date.now() / 1000),
        };

        const accessToken = await sign(tokenPayload, process.env.JWT_SECRET as SignatureKey);

        setCookie(c, "token", accessToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        return formattedSuccesResponse(c, 200, loginRoute.responses[200].description, {
            accessToken,
        });
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, loginRoute.responses[500].description);
    }
};
