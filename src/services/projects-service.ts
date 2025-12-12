import { dbConfig } from "@/config";
import { developerProject, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";

/**
 * @api {get} Get all developer projects
 * @apiGroup Projects
 * @access Private
 */
export const getProjectsForDeveloper = async (userId: string) => {
  const dbQuery = await dbConfig
    .select()
    .from(developerProject)
    .where(eq(developerProject.userId, userId))
    .limit(1);

  return dbQuery[0];
};
