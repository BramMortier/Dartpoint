// =============================================================================
// Imports
// =============================================================================
import { verify, decode } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { MiddlewareHandler } from "hono";
import { formattedErrorResponse } from "../utils/formattedResponse";
import { SignatureKey } from "hono/utils/jwt/jws";

// =============================================================================
// Middleware handler
// =============================================================================
export const verifyJWT = (): MiddlewareHandler => {
    return async (c, next) => {
        try {
            const token = getCookie(c, "token");
            console.log(token);
            if (!token) return formattedErrorResponse(c, 401, "Unauthorized");

            const validToken = await verify(token, process.env.JWT_SECRET as SignatureKey);
            if (!validToken) return formattedErrorResponse(c, 403, "Forbidden");

            c.set("token", token);

            return next();
        } catch (error) {
            console.error(error);
            return formattedErrorResponse(c, 500, "Internal server error");
        }
    };
};
