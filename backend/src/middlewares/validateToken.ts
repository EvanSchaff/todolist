import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../models/blacklistedTokensModel';
import * as dotenv from 'dotenv';

dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY;

export async function validateToken(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Invalid or missing authorization token',
			});
		}
		const decoded = jwt.verify(token, secret_key);
		if (typeof decoded === 'string') {
			return res.status(401).json({
				success: false,
				message: 'Invalid or missing authorization token',
			});
		}

		const blacklisted = await isTokenBlacklisted(token);
		if (blacklisted) {
			return res.status(401).json({
				success: false,
				message: 'Token has already been invalidated',
			});
		}

		req.token = decoded;

		next();
	}
	catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				success: false,
				message: 'Token has expired',
			});
		}
		else if (err instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				success: false,
				message: 'Invalid token',
			});
		}
		else {
			console.error(err);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	}
}