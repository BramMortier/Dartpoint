// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { getUsersRoute, getUsersHandler } from "./getUsers";
import { getUserHandler, getUserRoute } from "./getUser";
import { deleteUserHandler, deleteUserRoute } from "./deleteUser";
import { sendFriendRequestHandler, sendFriendRequestRoute } from "./sendFriendRequest";

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

// POST /api/users/friend-request
userRouter.openapi(sendFriendRequestRoute, sendFriendRequestHandler);

export { userRouter };
