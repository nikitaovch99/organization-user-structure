import { NextFunction, Request, Response } from 'express';

export const updateAction = (action: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.query.action === action) {
      next();
    } else {
      next('route');
    }
  };
};