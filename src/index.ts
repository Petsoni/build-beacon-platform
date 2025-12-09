import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";

const app = new Hono().basePath("/api");

app
  .use(
    "*",
    cors({
      origin: ["http://localhost:4200"],
      allowMethods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS"],
    })
  )
  // .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .get("/", (c) => {
    return c.json({
      message: "Bun server",
    });
  });

export default app;
