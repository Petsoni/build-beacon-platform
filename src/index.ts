import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./config/auth";
import { errorHandler, notFound } from "./middleware";
import developerRoutes from "./routes/developers-controller";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>({ strict: false }).basePath(process.env.API_BASE_URL!);

const port = process.env?.PORT || 8000;

app.use(logger());

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "http://localhost:8000",
    ], // TODO update for production
    credentials: true,
    maxAge: 86400, // Cache preflight for 1 day
  })
);

// Home Route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Build Beacon API",
  });
});

// Better-Auth - Handle all auth routes
app.all("/auth/*", async (c) => {
  return await auth.handler(c.req.raw);
});

// Developers Route
app.route("/developers", developerRoutes);

app.onError(errorHandler);

app.notFound(notFound);

export default {
  port,
  fetch: app.fetch,
};
