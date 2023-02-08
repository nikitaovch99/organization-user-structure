import { Router } from 'express';
import * as userController from '../controllers/users.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { updateAction } from '../middlewares/updateAction.js';
import { catchError } from '../utils/catchError.js';

export const userRouter = Router();

userRouter.post('/register', catchError(userController.register));
userRouter.get('/login', catchError(userController.authenticate));
userRouter.get('/users', catchError(authMiddleware), catchError(userController.list));
userRouter.patch('/users/:userId', 
  catchError(authMiddleware), updateAction('changeBoss'), catchError(userController.changeBoss));
userRouter.patch('/users/:userId', updateAction('changeToAdmin'), catchError(authMiddleware), 
  catchError(userController.changeRoleToAdmin));
