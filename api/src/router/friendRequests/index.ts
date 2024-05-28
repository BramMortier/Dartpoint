// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { createFriendRequestHandler, createFriendRequestRoute } from "./createFriendRequest";
import { getFriendRequestsHandler, getFriendRequestsRoute } from "./getFriendRequests";
import { deleteFriendRequestsHandler, deleteFriendRequestsRoute } from "./deleteFriendRequest";
import { patchFriendRequestHandler, patchFriendRequestRoute } from "./patchFriendRequest";
import { getFriendRequestHandler, getFriendRequestRoute } from "./getFriendRequest";

// =============================================================================
// Router configuration
// =============================================================================
const friendRequestsRouter = new OpenAPIHono();

// GET /friend-requests
friendRequestsRouter.openapi(getFriendRequestsRoute, getFriendRequestsHandler);

// GET /friend-requests/{friendId}
friendRequestsRouter.openapi(getFriendRequestRoute, getFriendRequestHandler);

// POST /friend-requests
friendRequestsRouter.openapi(createFriendRequestRoute, createFriendRequestHandler);

// DELETE /friend-requests/{friendId}
friendRequestsRouter.openapi(deleteFriendRequestsRoute, deleteFriendRequestsHandler);

// PATCH /friend-requests/{friendId}
friendRequestsRouter.openapi(patchFriendRequestRoute, patchFriendRequestHandler);

export { friendRequestsRouter };
