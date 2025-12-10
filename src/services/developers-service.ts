import { dbConfig } from "@/config";
import { user } from "@/db/schema";
import { Context } from "hono";

/**
 * @api {get} /developers Get All Developers
 * @apiGroup Developers
 * @access Private
 */
export const getAllDevelopers = async (c: Context) => {
  return c.json(await dbConfig.select().from(user));
};
