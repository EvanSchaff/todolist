import { Request, Response } from 'express';
import { deleteUser } from '../models/userModels';
import { blacklistToken } from '../models/blacklistedTokensModel';

export async function deleteUserController(req: Request, res: Response) {
	try {
		const userId = req.targetUser as string;
		const decoded = req.token;
		const token = req.headers.authorization?.split(' ')[1];

		await blacklistToken(token, new Date(decoded.exp * 1000));
		await deleteUser(userId);

		res.status(200).json({
			success: true,
			message: 'User successfully deleted',
			data: {
				user_id: userId,
			},
		});
	}
	catch (err) {
		console.error('Error in deleteUserController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during user deletion',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

