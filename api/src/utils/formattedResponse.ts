// =============================================================================
// Imports
// =============================================================================
import { Context } from "hono";

// =============================================================================
// Utility function
// =============================================================================
export const formattedSuccesResponse = (
    c: Context,
    status: number,
    message?: string,
    body?: object
) => {
    return c.json({ status, message, body }, { status });
};

export const formattedErrorResponse = (
    c: Context,
    status: number,
    message?: string,
    error?: object
) => {
    return c.json({ status, message, error }, { status });
};
