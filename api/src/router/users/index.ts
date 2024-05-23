// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { getUsersRoute, getUsersHandler } from "./getUsers";
import { getUserHandler, getUserRoute } from "./getUser";
import { deleteUserHandler, deleteUserRoute } from "./deleteUser";
import { createFriendRequestHandler, createFriendRequestRoute } from "./createFriendRequest";
import { getFriendRequestsHandler, getFriendRequestsRoute } from "./getFriendRequests";

// =============================================================================
// Router configuration
// =============================================================================
const userRouter = new OpenAPIHono();

// GET /api/users
userRouter.openapi(getUsersRoute, getUsersHandler);

// GET /api/users/{id}
userRouter.openapi(getUserRoute, getUserHandler);

// DELETE /api/users/{id}
userRouter.openapi(deleteUserRoute, deleteUserHandler);

// GET /api/users/{id}/friend-requests
userRouter.openapi(getFriendRequestsRoute, getFriendRequestsHandler);

// POST /api/users/friend-requests
userRouter.openapi(createFriendRequestRoute, createFriendRequestHandler);

export { userRouter };
