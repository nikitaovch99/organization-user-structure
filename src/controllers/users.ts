import { jwtService } from '../services/jswt.js';
import * as userService from '../services/users.js';
import { Request, Response } from 'express';
import { Role } from '../model/user.js';


export const list = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const user = await userService.getById(userId);
  if (!user) {
    return res.status(401).send('User not found');
  }

  if (user.role === Role.Administrator) {
    const users = await userService.getAll();
    return res.send(users.map(userService.normalize));
  }

  if (user.role === Role.Boss) {
    const subordinates = await userService.getAll(userId);
    const users = [user, ...subordinates];
    return res.send(users.map(userService.normalize));
  }

  res.send([user].map(userService.normalize));
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, bossId } = req.body;

  if (!name || !email || !password || !bossId) {
    res.sendStatus(422);
    return;
  }

  const user = await userService.findByEmail(email);
  if(user) {
    return res.status(401).send('This email already taken');
  }

  const boss = await userService.getById(bossId);

  if(!boss) {
    return res.status(404).send('Boss not found');
  }

  if (boss.role === Role.Regular) {
    await userService.update(boss.id, 'role', Role.Boss);
  }

  const createdUser = await userService.create(name, email, password, bossId);

  res.status(201).send(userService.normalize(createdUser));
};

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);
  if(!user) {
    return res.status(401).send('User not found');
  }

  if(user.password !== password) {
    return res.status(401).send('Wrong password');
  }
  const accessToken = jwtService.generateAccessToken(user);

  res.send({
    user: userService.normalize(user),
    accessToken,
  });

};

export const changeBoss = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { newBossId } = req.body;
  const boss = await userService.getById(res.locals.userId);

  if (!boss || (boss.role !== Role.Boss && boss.role !== Role.Administrator)) {
    res.status(404).send('Boss not found');
    return;
  }
  const subordinate = await userService.getById(+userId);
  if (!subordinate) {
    return res.status(404).send('Subordinate not found');
  }

  const newBoss = await userService.getById(+newBossId);

  if (!newBoss) {
    return res.status(404).send('New Boss not found');
  }

  if (subordinate.bossId === newBoss.id) {
    return res.status(400).send('Subordinate already assigned');
  }

  if (subordinate.id === newBoss.bossId) {
    return res.status(400).send('Error subordinate is already a Boss');
  }

  await userService.update(newBoss.id, 'role', Role.Boss);
  await userService.update(subordinate.bossId, 'bossId', newBoss.id);
  newBoss.role = Role.Boss;
  subordinate.bossId = newBoss.id;

  res.send([subordinate, newBoss].map(userService.normalize));
};

export const changeRoleToAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const admin = await userService.getById(res.locals.userId);

  if (!admin || (admin.role !== Role.Administrator)) {
    res.status(404).send('Administrator not found');
    return;
  }

  const user = await userService.getById(+userId);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  await userService.update(admin.id, 'role', Role.Administrator);

  res.send(userService.normalize(user));
};
