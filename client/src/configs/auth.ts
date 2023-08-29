import type { AuthOptions } from 'next-auth';
import GooggleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { SIGN_IN_HANDLERS } from './handlers';
import { refreshCredentialsAccessToken, refreshGoogleAccessToken } from './refreshToken';

export const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authConfug: AuthOptions = {
  providers: [
    GooggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const response = await fetch(process.env.API_URL + 'users/account/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            console.log('Sign In Authorize Error');
            throw new Error('Login request failed');
          }

          const responseData = await response.json();
          if (responseData) return responseData;
        } catch (error) {
          console.log('CREDENTIALS SIGNIN ERROR');
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account!.provider)) return false;
      const provider: SignInProvider = account!.provider as SignInProvider;
      return SIGN_IN_HANDLERS[provider](user, account, profile, email, credentials);
    },
    async jwt({ token, user, account, profile }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        // If google provider in "account" GoogleSignInData data, in account.meta ResponseUser data
        // If credentials provider user is ResponseUser data
        const backendResponse =
          account.provider === 'credentials' ? user : account['meta'];
        token['refresh_token'] =
          account.provider === 'google' ? account.refresh_token : backendResponse.refresh;
        token['expires_in'] =
          account.provider === 'google'
            ? account.expires_at!
            : getCurrentEpochTime() +
              parseInt(process.env.BACKEND_ACCESS_TOKEN_LIFETIME!);

        token['access_token'] = backendResponse.access;
        token['user'] = backendResponse.user;
        token['provider'] = account.provider as SignInProvider;
        return token;
      }
      // Refresh the backend token if necessary
      else if (
        getCurrentEpochTime() > token['expires_in'] &&
        token['provider'] === 'credentials'
      ) {
        return await refreshCredentialsAccessToken(token);
      } else if (
        getCurrentEpochTime() > token['expires_in'] &&
        token['provider'] === 'google'
      ) {
        return await refreshGoogleAccessToken(token);
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.BACKEND_REFRESH_TOKEN_LIFETIME!),
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  // debug: process.env.NODE_ENV !== 'production',
};
