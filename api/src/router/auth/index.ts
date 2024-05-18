// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { registerRoute, registerHandler } from "./register";
import { loginRoute, loginHandler } from "./login";
import { logoutHandler, logoutRoute } from "./logout";

// =============================================================================
// Router configuration
// =============================================================================
const authRouter = new OpenAPIHono();

authRouter.openapi(registerRoute, registerHandler);
authRouter.openapi(loginRoute, loginHandler);
authRouter.openapi(logoutRoute, logoutHandler);

export { authRouter };
