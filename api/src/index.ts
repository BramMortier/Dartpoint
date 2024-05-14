import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";

import { userRouter } from "./router/users";
import { authRouter } from "./router/auth";
import { protectedRouter } from "./router/protected";

const api = new OpenAPIHono();

api.doc("/doc", {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "JWT auth flow",
        description:
            "An example API that has a JWT auth flow built in for authentication & authorization. It makes use of refresh and accestokens to protect the API's resources",
    },
});

api.get("/ui", swaggerUI({ url: "/doc" }));

api.use(cors());
api.use(logger());
api.use(prettyJSON());

api.route("/users", userRouter);
api.route("/auth", authRouter);
api.route("/protected", protectedRouter);

export default api;
