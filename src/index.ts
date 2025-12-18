import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "@/config";
import { errorHandler, notFound } from "./middleware";
import developerRoutes from "./routes/developers-controller";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>({ strict: false });

app.use(logger());

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      `${process.env.CLIENT_URL}`,
      "http://localhost:8000",
    ], // TODO update for production,
    credentials: true,
    maxAge: 86400, // Cache preflight for 1 day
  })
);

// Home Route
app.get("/api", (c) => {
  return c.json({
    message: "Welcome to the Build Beacon API",
  });
});

// Better-Auth - Handle all auth routes
app.all("/api/auth/*", async (c) => {
  return await auth.handler(c.req.raw);
});

// Developers Route
app.route("/api/developers", developerRoutes);

app.onError(errorHandler);

app.notFound(notFound);

export default {
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
};
