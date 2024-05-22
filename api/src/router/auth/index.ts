// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { registerRoute, registerHandler } from "./register";
import { loginRoute, loginHandler } from "./login";
import { logoutHandler, logoutRoute } from "./logout";
import { getAuthRoute, getAuthHandler } from "./getAuth";

// =============================================================================
// Router configuration
// =============================================================================
const authRouter = new OpenAPIHono();

// GET /api/auth
authRouter.openapi(getAuthRoute, getAuthHandler);

// POST /api/auth/register
authRouter.openapi(registerRoute, registerHandler);

// POST /api/auth/login
authRouter.openapi(loginRoute, loginHandler);

// POST /api/auth/logout
authRouter.openapi(logoutRoute, logoutHandler);

export { authRouter };
