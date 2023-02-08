import { NextFunction, Request, Response, RequestHandler } from 'express';

export function catchError(action: RequestHandler)  {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}