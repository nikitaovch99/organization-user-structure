import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtAccessSecret = process.env.JWT_SECRET || 'secret';
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
