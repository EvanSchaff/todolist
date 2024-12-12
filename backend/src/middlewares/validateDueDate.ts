import { Request, Response, NextFunction } from 'express';

export async function validateDate(req: Request, res: Response, next: NextFunction) {

	if (!req.body.hasOwnProperty('dueDate') ||
	req.body.dueDate === undefined ||
	req.body.dueDate === null ||
	String(req.body.dueDate).trim() === '') {
		return next();
	}

	const parsedDate = new Date(req.body.dueDate);

	if (isNaN(parsedDate.getTime())) {
		return res.status(400).json({
			success: false,
			message: 'Invalid date format',
		});
	}

	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	if (parsedDate < currentDate) {
		return res.status(400).json({
			success: false,
			message: 'Due date cannot be in the past',
		});
	}

	req.body.dueDate = parsedDate;

	next();
}