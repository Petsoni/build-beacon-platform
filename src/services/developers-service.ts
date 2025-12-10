import { Context } from "hono";

/**
 * @api {get} /users Get All Users
 * @apiGroup Users
 * @access Private
 */
export const getAllDevelopers = async (c: Context) => {
  return c.json(["dev1", "dev2"]);
};
