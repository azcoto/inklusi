import { Request, Response } from 'express';

export const me = async (req: Request, res: Response) => {
  res.status(200).send({ me: 'me' });
};
