import { Request, Response } from 'express';
import { hashPassword } from '../utils/hashPassword';
import { createUser } from '../models/userModels';
import { blacklistToken } from '../models/blacklistedTokensModel';
import { generateToken } from '../utils/generateToken';


export async function registerUserController(req: Request, res: Response) {
	try {
		const { username, password }: { username: string, password: string } = req.body;

		const passwordHash = await hashPassword(password);
		await createUser(username, passwordHash);

		res.status(201).json({
			success: true,
			message: 'User successfully created',
		});

	}
	catch (err) {
		console.error('Error during user registration:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during user creation',
			error: err instanceof Error ? err.message : 'Unknown error',
		});

	}
}

export async function loginUserController(req: Request, res: Response) {
	try {
		const user = req.targetUser;

		const token = generateToken({ id: user.user_id, username: user.username });

		res.status(200).json({
			success: true,
			message: 'Login successful',
			data: {
				token,
				user_id: user.user_id,
				username: user.username,
			},
		});
	}
	catch (err) {
		console.error('Error during user login:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during user login',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}

}

export async function logoutUserController(req: Request, res: Response) {
	try {
		const decoded = req.token;
		const token = req.headers.authorization?.split(' ')[1];

		await blacklistToken(token, new Date(decoded.exp * 1000));

		res.status(200).json({
			success: true,
			message: 'Logged out successfully',
		});
	}
	catch (err) {
		console.error('Error during user logout:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during user logout',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}

}