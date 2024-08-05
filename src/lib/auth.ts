import { Awaitable, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  loginWithEmailAndPassword,
  loginWithFederatedProvider,
} from '@/services/user.service';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     request_uri: `${process.env.NEXT_PUBLIC_API_URL!}/auth/google/callback`,
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
    CredentialsProvider({
      credentials: {
        token: {
          label: 'token',
          type: 'text',
        },
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
        if (credentials!.token) {
          const token = credentials!.token;
          const decodedAccessToken = JSON.parse(
            Buffer.from(token!.split('.')[1], 'base64').toString(),
          );
          const user = {
            id: decodedAccessToken['id'],
            name: decodedAccessToken['name'],
            email: decodedAccessToken['email'],
            accessToken: token,
          };
          return user;
        }

        const res = await loginWithEmailAndPassword(
          credentials!.email as string,
          credentials!.password as string,
        );
        if (res?.status !== 201) {
          throw new Error(res?.data.message);
        }

        const user = res?.data;
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
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
        return token as Awaitable<JWT>;
      }
      throw new Error('Token expired or invalid');
    },

    async session({ session, token }) {
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
  },
};
