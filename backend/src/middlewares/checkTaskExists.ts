import { Request, Response, NextFunction } from 'express';
import { getTaskById } from '../models/taskModels';

export async function checkTaskExists(req: Request, res: Response, next: NextFunction) {
	const { taskId } = req.params;

	try {
		const task = await getTaskById(taskId);
		if (!task) {
			return res.status(404).json({
				success: false,
				message: 'Task not found or does not belong to the user',
			});
		}
		req.targetTask = task;
		next();
	}
	catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error checking for task',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}