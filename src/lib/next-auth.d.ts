import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    exp: number;
  }

  interface Session {
    user: User & DefaultSession['user'];
    expires: string;
    error: string;
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    exp: number;
  }

  interface JWT {
    user: User & DefaultSession['user'];
    expires: string;
    error: string;
  }
}
