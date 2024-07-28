import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    // refreshToken: string
    exp: number;
    role: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
    expires: string;
    error: string;
  }
}
