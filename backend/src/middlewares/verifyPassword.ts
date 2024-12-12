import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

export async function verifyPassword(req: Request, res: Response, next: NextFunction) {
	try {
		const { password } = req.body;
		const user = req.targetUser;

		const isValidPassword = await bcrypt.compare(password, user.password_hash);
		if (!isValidPassword) {
			return res.status(401).json({
				success: false,
				message: 'Invalid username or password',
			});
		}

		next();
	}
	catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during password verification',
		});
	}
}