import { Request, Response, NextFunction } from 'express';
import { getListById } from '../models/listModels';

export async function checkListExists(req: Request, res: Response, next: NextFunction) {
	const { listId } = req.params;

	try {
		const list = await getListById(listId);
		if (!list) {
			return res.status(404).json({
				success: false,
				message: 'List not found or does not belong to the user',
			});
		}
		req.targetList = list;
		next();
	}
	catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error checking for list',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}