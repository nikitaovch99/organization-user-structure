import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../services/jswt.js';

interface JwtPayload {
  id: number,
}


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.sendStatus(401);
    return;
  }
  const [, accessToken] = authHeader.split(' ');
  
  if(!accessToken) {
    res.sendStatus(401);
    return;
  }

  const { id } = jwtService.validateAccessToken(accessToken) as JwtPayload;
  if(!id) {
    res.sendStatus(401);
    return;
  } 

  res.locals.userId = id;
  next();
}