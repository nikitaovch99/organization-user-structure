var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jwtService } from '../services/jswt.js';
import * as userService from '../services/users.js';
import { Role } from '../model/user.js';
export const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const user = yield userService.getById(userId);
    if (!user) {
        return res.status(401).send('User not found');
    }
    if (user.role === Role.Administrator) {
        const users = yield userService.getAll();
        return res.send(users.map(userService.normalize));
    }
    if (user.role === Role.Boss) {
        const subordinates = yield userService.getAll(userId);
        const users = [user, ...subordinates];
        return res.send(users.map(userService.normalize));
    }
    res.send([user].map(userService.normalize));
});
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bossId } = req.body;
    if (!name || !email || !password || !bossId) {
        res.sendStatus(422);
        return;
    }
    const user = yield userService.findByEmail(email);
    if (user) {
        return res.status(401).send('This email already taken');
    }
    const boss = yield userService.getById(bossId);
    if (!boss) {
        return res.status(404).send('Boss not found');
    }
    if (boss.role === Role.Regular) {
        yield userService.update(boss.id, 'role', Role.Boss);
    }
    const createdUser = yield userService.create(name, email, password, bossId);
    res.status(201).send(userService.normalize(createdUser));
});
export const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userService.findByEmail(email);
    if (!user) {
        return res.status(401).send('User not found');
    }
    if (user.password !== password) {
        return res.status(401).send('Wrong password');
    }
    const accessToken = jwtService.generateAccessToken(user);
    res.send({
        user: userService.normalize(user),
        accessToken,
    });
});
export const changeBoss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { newBossId } = req.body;
    const boss = yield userService.getById(res.locals.userId);
    if (!boss || (boss.role !== Role.Boss && boss.role !== Role.Administrator)) {
        res.status(404).send('Boss not found');
        return;
    }
    const subordinate = yield userService.getById(+userId);
    if (!subordinate) {
        return res.status(404).send('Subordinate not found');
    }
    const newBoss = yield userService.getById(+newBossId);
    if (!newBoss) {
        return res.status(404).send('New Boss not found');
    }
    if (subordinate.bossId === newBoss.id) {
        return res.status(400).send('Subordinate already assigned');
    }
    if (subordinate.id === newBoss.bossId) {
        return res.status(400).send('Error subordinate is already a Boss');
    }
    yield userService.update(newBoss.id, 'role', Role.Boss);
    yield userService.update(subordinate.bossId, 'bossId', newBoss.id);
    newBoss.role = Role.Boss;
    subordinate.bossId = newBoss.id;
    res.send([subordinate, newBoss].map(userService.normalize));
});
export const changeRoleToAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const admin = yield userService.getById(res.locals.userId);
    if (!admin || (admin.role !== Role.Administrator)) {
        res.status(404).send('Administrator not found');
        return;
    }
    const user = yield userService.getById(+userId);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    yield userService.update(admin.id, 'role', Role.Administrator);
    res.send(userService.normalize(user));
});
