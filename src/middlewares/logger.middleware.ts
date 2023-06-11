import { Request, Response } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  console.log(req.ip);
  next();
};
