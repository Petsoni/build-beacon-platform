import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbConfig } from "@/config/db-config";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(dbConfig, {
    provider: "pg",
  }),
  trustedOrigins: [process.env.APP_URL!],
  baseURL: process.env.BETTER_AUTH_URL!,
  session: { modelName: "sessions" },
  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    },
  },
  plugins: [openAPI()],
});
