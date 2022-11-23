import { NextAuthOptions } from 'next-auth';

import { CredentialsProvider } from './providers';
import { jwt, session } from './callbacks';

export const options: NextAuthOptions = {
  providers: [CredentialsProvider],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt,
    session,
  },
};
