import { Request, Response, NextFunction } from 'express';
import { fetchUserByName } from '../models/userModels';

export async function checkUserExists(req: Request, res: Response, next: NextFunction) {
	const { username } = req.body;
	try {
		const user = await fetchUserByName(username);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}
		req.targetUser = user;
		next();
	}
	catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error checking for user',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}