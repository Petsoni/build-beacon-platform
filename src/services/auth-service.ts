import { dbConfig } from "@/config";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserUsername = async (userId: string) => {
  return dbConfig
    .select({ username: user.username })
    .from(user)
    .where(eq(user.id, userId));
};
