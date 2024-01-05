import verifyOTP from "@/helpers/api/verifiyOtp";
import { SessionData, UserObject, UserSession } from "@/types/session";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface TCredentials {
  value: string;
  code: string;
  type: "phone" | "email";
}

const getCredentialDataByType = ({ value, code, type }: TCredentials) => {
  return {
    [type]: value,
    code: code,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        type: { label: "Type", type: "text" },
        value: { label: "Value", type: "text" },
        code: { label: "Code", type: "text" },
      },
      //@ts-ignore
      authorize: async (credentials): Promise<SessionData | null> => {
        if (!credentials?.value || !credentials?.code || !credentials.type)
          return null;
        else {
          const payLoad = getCredentialDataByType({
            value: credentials.value,
            code: credentials.code,
            type: credentials.type as TCredentials["type"],
          });

          try {
            const data = (await verifyOTP({
              requestOptions: {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              },
              requestBody: JSON.stringify(payLoad),
            })) as UserSession;

            return data.data;
          } catch (err) {
            return null;
          }
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }) {
      session = { ...session, ...token };

      return session;
    },
  },
};
