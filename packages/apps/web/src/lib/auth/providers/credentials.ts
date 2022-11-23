import NextAuthCredentialsProvider from 'next-auth/providers/credentials';
import JWT, { JwtPayload } from 'jsonwebtoken';

import { loginService } from '@fybf/shared.services';

export const CredentialsProvider = NextAuthCredentialsProvider({
  name: 'Credentials',

  credentials: {
    email: {
      label: 'Email',
      type: 'email',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },

  authorize: async (credentials) => {
    if (!!credentials) {
      try {
        const response = await loginService({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!!response.data.user) {
          const decodedAccessToken = JWT.decode(
            response.data.token,
          ) as JwtPayload;

          const decodedRefreshToken = JWT.decode(
            response.data.refresh_token,
          ) as JwtPayload;

          return {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            access_token: response.data.token,
            refresh_token: response.data.refresh_token,
            access_token_expires: decodedAccessToken.exp as number,
            refresh_token_expires: decodedRefreshToken.exp as number,
          };
        }

        return null;
      } catch (error: any) {
        console.log(
          '[auth/provider/authorize] Error responding: ',
          error.response.data,
        );

        return null;
      }
    } else {
      return null;
    }
  },
});
