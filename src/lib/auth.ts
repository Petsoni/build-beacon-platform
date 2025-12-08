import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {dbConfig} from "@/db/db-config";
import {openAPI} from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(dbConfig, {
    provider: "pg"
  }),
  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!
    }
  },
  plugins: [
    openAPI()
  ]
});