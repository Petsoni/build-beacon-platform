import { dbConfig } from "@/config";
import { developerProject, user } from "@/db/schema";
import { uuid, uuidv4 } from "better-auth/*";
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

/**
 * @api {post} Update project details and status
 * @apiGroup Developers
 * @access Private
 */
export const updateProjectDetailsAndStatus = async (c: Context) => {
  const newProjectDetails = await c.req.json();
  console.log(newProjectDetails);
  let dbProjectChange;

  if (newProjectDetails.id != null) {
    dbProjectChange = await dbConfig
      .update(developerProject)
      .set({
        status: newProjectDetails.status,
        title: newProjectDetails.title,
        link: newProjectDetails.link,
      })
      .where(eq(developerProject.id, newProjectDetails.id))
      .returning();
  } else {
    dbProjectChange = await dbConfig
      .insert(developerProject)
      .values({
        status: newProjectDetails.status,
        title: newProjectDetails.title,
        link: newProjectDetails.link,
        userId: newProjectDetails.userId,
      })
      .returning();
  }
  return c.json(dbProjectChange[0]);
};
