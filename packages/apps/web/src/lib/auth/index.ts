import NextAuth from 'next-auth';

import type { NextApiRequest, NextApiResponse } from 'next';

import { options } from './options';

export const Auth = async (req: NextApiRequest, res: NextApiResponse) =>
  await NextAuth(req, res, options);
