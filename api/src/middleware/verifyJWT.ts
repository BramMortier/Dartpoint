import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { MiddlewareHandler } from "hono";
import { formattedErrorResponse } from "../utils/formattedResponse";

export const verifyJWT = (): MiddlewareHandler => {
    return async (c, next) => {
        try {
            const token = getCookie(c, "token");
            if (!token) return formattedErrorResponse(c, 401, "Unauthorized");

            const validToken = await verify(token, process.env.JWT_SECRET);
            if (!validToken) return formattedErrorResponse(c, 403, "Forbidden");

            return next();
        } catch (error) {
            console.error(error);
            return formattedErrorResponse(c, 500, "Internal server error");
        }
    };
};
