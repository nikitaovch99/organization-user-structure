import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
const jwtAccessSecret = uuidv4();
function generateAccessToken(user) {
    return jwt.sign(JSON.stringify(user), jwtAccessSecret);
}
function validateAccessToken(token) {
    try {
        return jwt.verify(token, jwtAccessSecret);
    }
    catch (error) {
        console.log('Error during validating');
        return null;
    }
}
export const jwtService = { generateAccessToken, validateAccessToken };
