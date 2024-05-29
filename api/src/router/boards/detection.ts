// =============================================================================
// Module imports
// =============================================================================
import { createRoute, z } from "@hono/zod-openapi";
import { Handler } from "hono";
import { pusher } from "../../config/pusher";
import { validateRequest } from "../../middleware/requestValidator";

import { ErrorResponseSchema, SuccesResponseSchema } from "../../models/response";
import { formattedErrorResponse, formattedSuccesResponse } from "../../utils/formattedResponse";

// =============================================================================
// Request Schemas
// =============================================================================
const paramsSchema = z.object({
    boardCode: z.string().openapi({
        param: {
            name: "boardCode",
            description: "Code of the dartpoint module",
            in: "path",
        },
        example: "DP_KW5PPYWD",
    }),
});

// const requestSchema = z.object({
//     score: z.number(),
// });

// =============================================================================
// Route defenition
// =============================================================================
export const detectionRoute = createRoute({
    method: "post",
    path: "/{boardCode}/detection",
    summary: "Send the data of a detected dart to the users that are connected with the board",
    // request: {
    //     params: paramsSchema,
    //     body: {
    //         content: {
    //             "application/json": {
    //                 schema: requestSchema,
    //             },
    //         },
    //         description: "Data for the detected dart",
    //     },
    // },
    // middleware: [validateRequest(requestSchema)],
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SuccesResponseSchema,
                },
            },
            description: "Successfully sent detected dart",
        },
        422: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
            description: "Incorrect or missing request data",
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
    tags: ["boards"],
});

// =============================================================================
// Route handler
// =============================================================================
export const detectionHandler: Handler = async (c) => {
    try {
        const boardCodeParam = c.req.param("boardCode");

        const body = await c.req.json();

        console.log(`board-${boardCodeParam}`);

        pusher.trigger(`board-${boardCodeParam}`, "detection", {
            dartInfo: body,
        });

        return formattedSuccesResponse(c, 200, detectionRoute.responses[200].description);
    } catch (error) {
        console.error(error);
        return formattedErrorResponse(c, 500, detectionRoute.responses[500].description);
    }
};
