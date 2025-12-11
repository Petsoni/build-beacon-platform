import { dbConfig } from "@/config";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Context } from "hono";

/**
 * @api {get} Get All Developers
 * @apiGroup Developers
 * @access Private
 */
export const getAllDevelopers = async (c: Context) => {
  return c.json(await dbConfig.select().from(user));
};

/**
 * @api {post} Update developer X account
 * @apiGroup Developers
 * @access Private
 */
export const updateDeveloperXAccount = async (c: Context) => {
  const { username, userId } = await c.req.json();
  const dbUsernameChange = await dbConfig
    .update(user)
    .set({ username: username })
    .where(eq(user.id, userId))
    .returning({ updatedUsername: user.username });

  return c.json(dbUsernameChange[0].updatedUsername);
};
