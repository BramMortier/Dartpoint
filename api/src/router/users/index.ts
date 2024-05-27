// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { getUsersRoute, getUsersHandler } from "./getUsers";
import { getUserHandler, getUserRoute } from "./getUser";
import { deleteUserHandler, deleteUserRoute } from "./deleteUser";
import { createFriendRequestHandler, createFriendRequestRoute } from "./createFriendRequest";
import { getFriendRequestsHandler, getFriendRequestsRoute } from "./getFriendRequests";
import { deleteFriendRequestsHandler, deleteFriendRequestsRoute } from "./deleteFriendRequest";
import { patchFriendRequestHandler, patchFriendRequestRoute } from "./patchFriendRequest";

// =============================================================================
// Router configuration
// =============================================================================
const userRouter = new OpenAPIHono();

// GET /api/users
userRouter.openapi(getUsersRoute, getUsersHandler);

// GET /api/users/{userId}
userRouter.openapi(getUserRoute, getUserHandler);

// DELETE /api/users/{userId}
userRouter.openapi(deleteUserRoute, deleteUserHandler);

// GET /api/users/{userId}/friend-requests
userRouter.openapi(getFriendRequestsRoute, getFriendRequestsHandler);

// POST /api/users/friend-requests
userRouter.openapi(createFriendRequestRoute, createFriendRequestHandler);

// DELETE /api/users/{userId}/friend-requests/{friendId}
userRouter.openapi(deleteFriendRequestsRoute, deleteFriendRequestsHandler);

// PATCH /api/users/{userId}/friend-requests/{friendId}
userRouter.openapi(patchFriendRequestRoute, patchFriendRequestHandler);

export { userRouter };
