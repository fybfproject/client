import { CallbacksOptions } from 'next-auth';

import JWT, { JwtPayload } from 'jsonwebtoken';

import { refreshTokenService } from '@fybf/shared.services';

const refreshToken = async (token: string) => {
  try {
    const { data } = await refreshTokenService(token);

    return data.token;
  } catch (error) {
    console.log('[auth/refresh-token] Error responding: ', error);
  }
};

export const jwt: CallbacksOptions['jwt'] = async ({ token, user }) => {
  // The user object is available on the first JWT callback run
  if (user) {
    token.id = user.id;
    token.access_token = user.access_token;
    token.refresh_token = user.refresh_token;
    token.access_token_expires = user.access_token_expires;
    token.refresh_token_expires = user.refresh_token_expires;
    token.refresh_token_expired = false;
  }

  const now = Math.floor(Date.now() / 1000);

  // If the refresh token is expired, we need to log the user out
  if (now > token.refresh_token_expires) {
    console.log('[auth/callback/jwt] Refresh token expired');

    token.refresh_token_expired = true;
  }

  // If the access token is expired, we need to refresh it
  if (now > token.access_token_expires) {
    console.log('[auth/callback/jwt] Access token expired');

    const response = await refreshToken(token.refresh_token);

    const decoded = JWT.decode(response as string) as JwtPayload;

    token.access_token = response as string;
    token.access_token_expires = decoded.exp as number;
  }

  return token;
};

export const session: CallbacksOptions['session'] = ({ session, token }) => {
  if (token) {
    session.id = token.id;
    session.access_token = token.access_token;
    session.refresh_token = token.refresh_token;
    session.access_token_expires = token.access_token_expires;
    session.refresh_token_expires = token.refresh_token_expires;
    session.refresh_token_expired = token.refresh_token_expired;
  }

  return session;
};
