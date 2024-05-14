import { OpenAPIHono } from "@hono/zod-openapi";

import { getSecretHandler, getSecretRoute } from "./getSecret";

const protectedRouter = new OpenAPIHono();

protectedRouter.openapi(getSecretRoute, getSecretHandler);

export { protectedRouter };
