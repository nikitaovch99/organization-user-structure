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
export function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.sendStatus(401);
            return;
        }
        const [, accessToken] = authHeader.split(' ');
        if (!accessToken) {
            res.sendStatus(401);
            return;
        }
        const { id } = jwtService.validateAccessToken(accessToken);
        if (!id) {
            res.sendStatus(401);
            return;
        }
        res.locals.userId = id;
        next();
    });
}
