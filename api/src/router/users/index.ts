// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { getUsersRoute, getUsersHandler } from "./getUsers";
import { getUserHandler, getUserRoute } from "./getUser";
import { deleteUserHandler, deleteUserRoute } from "./deleteUser";

// =============================================================================
// Router configuration
// =============================================================================
const userRouter = new OpenAPIHono();

// GET /users
userRouter.openapi(getUsersRoute, getUsersHandler);

// GET /users/{userId}
userRouter.openapi(getUserRoute, getUserHandler);

// DELETE /users/{userId}
userRouter.openapi(deleteUserRoute, deleteUserHandler);

export { userRouter };
