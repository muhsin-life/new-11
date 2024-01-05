import NextAuth from "next-auth/next";
import { SessionData, User, UserObject } from "./session";

declare module "next-auth" {
  export interface User {
    user: UserObject;
    token: string;
  }

  export interface Session {
    user: UserObject;
    token: string;
  }
}
