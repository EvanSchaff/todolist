import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY;

export function generateToken(payload: object, expiresIn = '1h') {
	return jwt.sign(payload, secret_key, { expiresIn });
}
