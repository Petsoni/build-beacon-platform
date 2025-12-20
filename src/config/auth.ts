import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {dbConfig} from "@/config/db-config";
import {customSession, openAPI} from "better-auth/plugins";
import {sendVerificationEmailWithResend} from "@/lib/email-sender";
import {getUserUsername} from "@/services/auth-service";
import {getProjectsForDeveloper} from "@/services/projects-service";

export const auth = betterAuth({
  database: drizzleAdapter(dbConfig, {
    provider: "pg",
  }),
  trustedOrigins: [process.env.CLIENT_URL!],
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
    useSecureCookies: true,
  },
  emailVerification: {
    expiresIn: 60 * 5,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendVerificationEmailWithResend({
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
  plugins: [
    openAPI(),
    customSession(async ({ user, session }) => {
      const query = await getUserUsername(user.id);
      const userProject = await getProjectsForDeveloper(user.id);

      return {
        user: {
          ...user,
          username: query[0].username,
          currentProject: userProject,
        },
        session,
      };
    }),
  ],
});
