// =============================================================================
// Imports
// =============================================================================
import { MiddlewareHandler } from "hono";
import { formattedErrorResponse } from "../utils/formattedResponse";
import { ZodSchema } from "zod/lib";

// =============================================================================
// Middleware handler
// =============================================================================
export const validateRequest = (schema: ZodSchema): MiddlewareHandler => {
    // TODO: add the validated object to the c.req.valid prop
    return async (c, next) => {
        try {
            const body = await c.req.json();

            const parsed = schema.safeParse(body);
            if (parsed.error)
                return formattedErrorResponse(
                    c,
                    422,
                    "Incorrect or missing request data",
                    parsed.error
                );

            await next();
        } catch (error) {
            console.log(error);
            return formattedErrorResponse(c, 500, "Internal server error");
        }
    };
};
