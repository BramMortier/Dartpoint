// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";

import { userRouter } from "./router/users";
import { authRouter } from "./router/auth";
import { protectedRouter } from "./router/protected";

// TODO: add path aliases

// =============================================================================
// Initialize Hono with OpenAPI
// =============================================================================
const api = new OpenAPIHono();

const swaggerTheme = new SwaggerTheme();
const gruvboxTheme = swaggerTheme.getBuffer(SwaggerThemeNameEnum.GRUVBOX);

console.log(gruvboxTheme);

api.doc("/doc", {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Dartpoint",
        description:
            "This is the central api that serves as a backbone for the dartpoint platform. It handles authentication and authorization. Realtime datastreaming using Pusher.js and CRUD operations on the PostgreSQL database",
    },
});

// =============================================================================
// Routes & middleware configuration
// =============================================================================
swaggerUI({ url: "/doc" });

api.get("/ui", swaggerUI({ url: "/doc" }));

api.use(cors({ origin: "http://localhost:5173", credentials: true }));
api.use(logger());
api.use(prettyJSON());

api.route("/users", userRouter);
api.route("/auth", authRouter);
api.route("/protected", protectedRouter);

export default api;
