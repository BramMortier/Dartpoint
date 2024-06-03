// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "@/config/db";
import { validateRequest } from "@/middleware/requestValidator";

import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";
import { verifyJWT } from "@/middleware/verifyJWT";
import { decode } from "hono/jwt";

// =============================================================================
// Request Schemas
// =============================================================================
const requestSchema = z.object({
    boardCode: z.string(),
});

// =============================================================================
// Route defenition
// =============================================================================
export const connectionRoute = createRoute({
    method: "post",
    path: "/connect",
    summary: "connect to a new dartpoint module",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: requestSchema,
                },
            },
            description: "Board code of the device",
        },
    },
    middleware: [validateRequest(requestSchema), verifyJWT()],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Successfully made connection",
        },
        400: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Invalid or wrong board code",
        },
        422: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
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
    tags: ["Boards"],
});

// =============================================================================
// Route handler
// =============================================================================
export const connectionHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const body = await c.req.json();

        const board = await db.board.findUnique({ where: { code: body.boardCode } });

        if (!board) return formattedResponse(c, 400, connectionRoute.responses[400].description);

        await db.boardUsers.create({
            data: {
                userId: decodedToken.payload.sub,
                boardId: board.id,
            },
        });

        return formattedResponse(c, 200, connectionRoute.responses[200].description, {
            board: board,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, connectionRoute.responses[500].description);
    }
};
