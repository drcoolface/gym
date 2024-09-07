import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    u_id: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  }
  interface Session {
    user: {
      u_id?: string;
      first_name?: string;
      last_name?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface jwt {
    u_id?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  }
}
