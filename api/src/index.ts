// =============================================================================
// Imports
// =============================================================================
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";

import { userRouter } from "./router/users";
import { authRouter } from "./router/auth";
import { protectedRouter } from "./router/protected";

import { pusher } from "./config/pusher";
// TODO: add path aliases

// =============================================================================
// Initialize Hono with OpenAPI
// =============================================================================
const api = new OpenAPIHono();

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
api.get("/ui", swaggerUI({ url: "/doc" }));

// =============================================================================
// Pusher event test
// =============================================================================
api.get("/pusher", (c) => {
    pusher.trigger("test-channel", "test-event", { message: "Hello from pusher" });

    return c.json("test event send");
});

api.use(cors({ origin: "http://localhost:5173", credentials: true }));
api.use(logger());
api.use(prettyJSON());

api.route("/users", userRouter);
api.route("/auth", authRouter);
api.route("/protected", protectedRouter);

export default api;
