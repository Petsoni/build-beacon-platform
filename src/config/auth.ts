import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbConfig } from "@/config/db-config";
import { openAPI } from "better-auth/plugins";
import { sendVerificationEmail } from "@/lib/email-sender";

export const auth = betterAuth({
  database: drizzleAdapter(dbConfig, {
    provider: "pg",
  }),
  trustedOrigins: [process.env.CLIENT_URL!],
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendVerificationEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: \n\n${url} \n\nVerification link expires in 60 minutes`,
      });
    },
  },
  // TODO
  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [openAPI()],
});
