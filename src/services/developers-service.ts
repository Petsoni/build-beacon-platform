import { dbConfig } from "@/config";
import { developerProject, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Context } from "hono";

/**
 * @api {get} Get All Developers for explore page
 * @apiGroup Developers
 * @access Private
 */
export const getAllDevelopersForExplorePage = async (c: Context) => {
  const dbQuery = await dbConfig
    .select()
    .from(user)
    .leftJoin(developerProject, eq(user.id, developerProject.userId))
    .where(eq(user.emailVerified, true));
  const mappedData = dbQuery.map((item) => {
    return {
      developerProject: item.developer_project,
      user: item.user,
    };
  });

  return c.json(mappedData);
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
