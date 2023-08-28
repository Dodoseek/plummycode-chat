import { AdapterUser } from 'next-auth/adapters';
import { CredentialInput } from 'next-auth/providers/credentials';
import type { Account, Profile } from 'next-auth';

export const SIGN_IN_HANDLERS: Record<SignInProvider, Function> = {
  credentials: async (
    user: User | AdapterUser,
    account: Account | null,
    profile: Profile | undefined,
    email: boolean | undefined,
    credentials: Record<string, CredentialInput> | undefined,
  ) => {
    return true;
  },
  google: async (
    user: User | AdapterUser,
    account: Account | null,
    profile: Profile | undefined,
    email: boolean | undefined,
    credentials: Record<string, CredentialInput> | undefined,
  ) => {
    try {
      const response = await fetch(process.env.API_URL + 'users/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: account!['id_token'],
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      account!['meta'] = responseData; // default login response
      return true;
    } catch (error) {
      console.log('GOOGLE SIGNIN');
      console.error(error);
      return false;
    }
  },
};
