// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "../../config/db";

import { boardSchema } from "@/models/board";
import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
const paramsSchema = z.object({
    boardId: z.string().openapi({
        param: { name: "boardId", description: "ID for user to retrieve", in: "path" },
        example: "46",
    }),
});

// =============================================================================
// Route defenition
// =============================================================================
export const getBoardRoute = createRoute({
    method: "get",
    path: "/{boardId}",
    summary: "Get a single boards info",
    request: {
        params: paramsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema.extend({
                        body: z.object({ board: boardSchema }),
                    }),
                },
            },
            description: "Succesfully retrieved the boards info",
        },
        404: {
            content: {
                "application/json": {
                    schema: ResponseSchema,
                },
            },
            description: "Board doesn't exist",
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
export const getBoardHandler: Handler = async (c) => {
    try {
        const boardIdParam = c.req.param("boardId");

        const board = db.board.findUnique({ where: { id: Number(boardIdParam) } });

        if (!board) return formattedResponse(c, 404, getBoardRoute.responses[404].description);

        return formattedResponse(c, 200, getBoardRoute.responses[200].description, {
            board: board,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, getBoardRoute.responses[500].description);
    }
};
