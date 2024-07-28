import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginWithEmailAndPassword } from '@/services/user.service';
import { privateRoutes } from '@/contains/constants';
import Google from 'next-auth/providers/google';

export const config = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          request_uri: `${process.env.NEXT_PUBLIC_API_URL!}/auth/google/callback`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'joe@example.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        console.log('req', req);

        const res = await loginWithEmailAndPassword(
          credentials.email as string,
          credentials.password as string,
        );
        if (res?.status !== 201) {
          throw new Error(res?.data.message);
        }

        const user = res?.data;

        if (user) {
          console.log('Returning user', res);
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   console.log(
    //     `Account: ${account?.provider} Profile: ${profile?.email} ${account?.id_token}`,
    //   );
    //   if (account?.provider === 'google') {
    //     return `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;
    //   }
    //   return true;
    // },

    async jwt({ token, user, account }) {
      console.log('jwt => ', token, user, account);
      if (account && user) {
        token.id = user.id;
        token.accessToken = user.accessToken;

        const decodedAccessToken = JSON.parse(
          Buffer.from(user.accessToken!.split('.')[1], 'base64').toString(),
        );

        if (decodedAccessToken) {
          token.userId = decodedAccessToken['sub'] as string;
          token.accessTokenExpires = decodedAccessToken['exp'] * 1000;
          token.role = decodedAccessToken['role'] as string;
        }
      }
      if (
        token.accessTokenExpires &&
        Date.now() < Number(token.accessTokenExpires)
      ) {
        const { refreshToken, ...rest } = token;

        return rest;
      }
      return null;
      // return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      console.log('session => ', session);

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          role: token.role as string,
        },
        error: token.error,
      };
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      // get the route name from the url such as "/about"
      const searchTerm = request.nextUrl.pathname
        .split('/')
        .slice(0, 2)
        .join('/');

      // if the private routes array includes the search term, we ask authorization here and forward any unauthorized users to the login page
      if (privateRoutes.includes(searchTerm)) {
        console.log(
          `${!!auth ? 'Can' : 'Cannot'} access private route ${searchTerm}`,
        );
        return !!auth;
        // if the pathname starts with one of the routes below and the user is already logged in, forward the user to the home page
      } else if (
        pathname.startsWith('/login') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/signup')
      ) {
        const isLoggedIn = !!auth;

        if (isLoggedIn) {
          return Response.redirect(new URL('/', request.nextUrl));
        }

        return true;
      }

      return true;
    },
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
