// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { db } from "../../config/db";

import { boardSchema } from "@/models/board";
import { ResponseSchema } from "@/models/response";
import { formattedResponse } from "@/utils/formattedResponse";
import { verifyJWT } from "@/middleware/verifyJWT";
import { decode } from "hono/jwt";

// =============================================================================
// Route defenition
// =============================================================================
export const getBoardsRoute = createRoute({
    method: "get",
    path: "/",
    summary: "Get a users saved devices",
    middleware: [verifyJWT()],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ResponseSchema.extend({
                        body: z.object({ boards: boardSchema }),
                    }),
                },
            },
            description: "Successfully retrieved the users saved devices",
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
export const getBoardsHandler: Handler = async (c) => {
    try {
        const token = c.get("token");
        const decodedToken = decode(token);

        const boards = await db.boardUsers.findMany({
            where: {
                userId: decodedToken.payload.sub,
            },
            include: {
                board: true,
            },
        });

        return formattedResponse(c, 200, getBoardsRoute.responses[200].description, {
            boards: boards,
        });
    } catch (error) {
        console.error(error);
        return formattedResponse(c, 500, getBoardsRoute.responses[500].description);
    }
};
