// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { detectionRoute, detectionHandler } from "./detection";
import { connectionHandler, connectionRoute } from "./connect";
import { getBoardsHandler, getBoardsRoute } from "./getBoards";

// =============================================================================
// Router configuration
// =============================================================================
const boardRouter = new OpenAPIHono();

// GET /boards
boardRouter.openapi(getBoardsRoute, getBoardsHandler);

// POST /boards/{boardCode}
boardRouter.openapi(detectionRoute, detectionHandler);

// POST /boards/connect
boardRouter.openapi(connectionRoute, connectionHandler);

export { boardRouter };
