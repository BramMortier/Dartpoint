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
import { friendRequestsRouter } from "./router/friendRequests";
import { boardRouter } from "./router/boards";
import { protectedRouter } from "./router/protected";

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

api.post("/throw", (c) => {
    return c.json({ message: "request received" });
});

api.use(cors({ origin: "http://localhost:5173", credentials: true }));
api.use(logger());
api.use(prettyJSON());

api.route("/users", userRouter);
api.route("/friend-requests", friendRequestsRouter);
api.route("/boards", boardRouter);
api.route("/auth", authRouter);
api.route("/protected", protectedRouter);

export default api;
