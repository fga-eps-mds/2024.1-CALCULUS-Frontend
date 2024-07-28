import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { googleCallback, loginWithEmailAndPassword } from '@/services/user.service';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params:{
          request_uri: `${process.env.NEXT_PUBLIC_API_URL!}/auth/google/callback`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        }
      },
    },
  ),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'example f@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(`Fumego`);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        console.log(
          `NextAuth, email: ${credentials.email}, password: ${credentials.password}`,
        );
        return await loginWithEmailAndPassword(
          credentials.email,
          credentials.password,
        );
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log(`Account: ${account?.provider} Profile: ${profile?.email}`);
      if (account?.provider === 'google') {
        // const response = await googleCallback();
        return `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token, user }) {
      console.log(`My Session: ${user?.email}`);
      session.user = user;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(`My JWT: ${user?.email} isNewUser: ${isNewUser} Account: ${account?.provider} Profile: ${profile?.email} Token: ${token}`); 
      if (user) {
        token.user = user;
      }
      return token;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
