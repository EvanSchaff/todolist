import { Request, Response, NextFunction } from 'express';

export async function validateRegistrationCredentials(req: Request, res: Response, next: NextFunction) {
	const { username, password }: { username: string, password: string } = req.body;

	if (username.length < 4 || username.length > 20) {
		return res.status(400).json({
			success: false,
			message: 'Username must be between 4 and 20 characters',
		});
	}
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
	if (!passwordRegex.test(password)) {
		return res.status(400).json({
			success: false,
			message: 'Password must be at least 6 characters long, include a letter, a number, and a special character',
		});
	}

	next();
}