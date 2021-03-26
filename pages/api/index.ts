import { NextApiRequest, NextApiResponse } from 'next';

type Payload = { endpoint: string; arguments: any };

const getUser = async (id: string) => {
  return { id, name: 'Bilbo' };
};
export type getUser = typeof getUser;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const payload: Payload = req.body;

  console.log(`PAYLOD`);
  console.log(payload);
  console.log(typeof payload);

  if (payload.endpoint === 'getUser') {
    const user = await getUser(...(payload.arguments as [any]));
    return res.status(200).send(user);
  }

  return res.status(404).send({ message: 'Endpoint not found' });
};
