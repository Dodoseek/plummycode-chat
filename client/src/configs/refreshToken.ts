import { JWT } from 'next-auth/jwt';
import { getCurrentEpochTime } from './auth';

type TokenSet = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export async function refreshGoogleAccessToken(token: JWT) {
  try {
    const response = await fetch('https://accounts.google.com/o/oauth2/token', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
      method: 'POST',
    });

    const tokens: TokenSet = await response.json();

    if (!response.ok) throw tokens;

    return {
      ...token,
      access_token: tokens.access_token,
      expires_in: getCurrentEpochTime() + tokens.expires_in,
      refresh_token: tokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.log('GOOGLE REFRESH');
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export async function refreshCredentialsAccessToken(token: JWT) {
  try {
    const response = await fetch(process.env.API_URL + 'users/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: token['refresh_token'],
      }),
    });

    if (!response.ok) {
      throw new Error('Token refresh request failed');
    }

    const responseData = await response.json();
    token['access_token'] = responseData.access;
    token['refresh_token'] = responseData.refresh;
    token['expires_in'] =
      getCurrentEpochTime() + parseInt(process.env.BACKEND_ACCESS_TOKEN_LIFETIME!);
    return token;
  } catch (error) {
    console.log('CREDENTIALS REFRESH ERROR');
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
