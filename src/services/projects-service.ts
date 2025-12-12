import { dbConfig } from "@/config";
import { developerProject } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Context } from "hono";

/**
 * @api {get} Get all developer projects
 * @apiGroup Projects
 * @access Private
 */
export const getProjectsForDeveloper = async (c: Context) => {
  //   const { userId } = await c.req.json();
  //   return c.json(
  //     await dbConfig
  //       .select()
  //       .from(developerProject)
  //       .where(eq(developerProject.userId, userId))
  //   );
};
