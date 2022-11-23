import { NextApiRequest, NextApiResponse } from 'next';

import { Auth } from '@/lib/auth';

const request = async (req: NextApiRequest, res: NextApiResponse) =>
  await Auth(req, res);

export default request;
