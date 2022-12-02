import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

import ImageKit from 'imagekit';

const imagekitInstance = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { file, userId } = req.body;

  const fileName = `${uuidv4()}.jpg`;

  if (!file) {
    return res.status(400).json({
      message: 'File is required',
    });
  }

  if (!userId) {
    return res.status(400).json({
      message: 'User ID is required',
    });
  }

  try {
    const upload = await imagekitInstance.upload({
      file,
      fileName,
      folder: `fybf/${process.env.IMAGEKIT_FOLDER}/spot/${userId}`,
    });

    res.status(200).json({ url: upload.url });
  } catch (error) {
    console.log({ error });

    res.status(500).json({
      message: 'Error uploading image',
    });
  }
};

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await handler(req, res);
  } else {
    res.status(405).json({
      message: 'Method not allowed',
    });
  }

  res.end();
};

export default request;
