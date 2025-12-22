import {dbConfig} from "@/config";
import {developerProject, user} from "@/db/schema";
import {eq} from "drizzle-orm";
import {Context} from "hono";

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
  const {username, userId} = await c.req.json();
  const dbUsernameChange = await dbConfig
    .update(user)
    .set({username: username})
    .where(eq(user.id, userId))
    .returning({updatedUsername: user.username});

  return c.json(dbUsernameChange[0].updatedUsername);
};

/**
 * @api {post} Update project details and status
 * @apiGroup Developers
 * @access Private
 */
export const updateProjectDetailsAndStatus = async (c: Context) => {
  const newProjectDetails = await c.req.json();
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

export const updateDeveloperNameAndEmail = async (c: Context) => {
  const {userId, name, email} = await c.req.json();
  const currentUser = (await dbConfig.select().from(user).where(eq(user.id, userId)))[0];
  const isForValidation = currentUser.email == email && currentUser.emailVerified
  const dbUsernameChange = await dbConfig
    .update(user)
    .set({name: name, email: email, emailVerified: isForValidation})
    .where(eq(user.id, userId))
    .returning({
      updatedEmail: user.email,
      updatedName: user.name,
      verifiedEmail: user.emailVerified
    });

  return c.json(dbUsernameChange[0]);
};
