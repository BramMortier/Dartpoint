import { OpenAPIHono } from "@hono/zod-openapi";

import { getUsersRoute, getUsersHandler } from "./getUsers";
import { getUserHandler, getUserRoute } from "./getUser";
import { deleteUserHandler, deleteUserRoute } from "./deleteUser";

const userRouter = new OpenAPIHono();

userRouter.openapi(getUsersRoute, getUsersHandler);
userRouter.openapi(getUserRoute, getUserHandler);
userRouter.openapi(deleteUserRoute, deleteUserHandler);

export { userRouter };
