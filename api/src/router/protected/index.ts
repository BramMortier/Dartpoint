// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";

import { getSecretHandler, getSecretRoute } from "./getSecret";

// =============================================================================
// Router configuration
// =============================================================================
const protectedRouter = new OpenAPIHono();

// GET /api/protected
protectedRouter.openapi(getSecretRoute, getSecretHandler);

export { protectedRouter };
