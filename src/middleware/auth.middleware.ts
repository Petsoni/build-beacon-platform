import { auth } from "@/config";
import { Context, Next } from "hono";

export const protect = async (c: Context, next: Next) => {
  // Extract the session from the incoming request headers

  console.log(c.req.raw.headers);

  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    return c.json(
      {
        success: false,
        message: "Unauthorized",
        error: "No valid session found",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
};
