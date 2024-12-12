import { Request, Response, NextFunction } from 'express';

export function validateBodyParams(paramKeys: string[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const missingParams = paramKeys.filter((key) => !req.body[key] || (typeof req.body[key] === 'string' && req.body[key].trim() === '') ||
        (Array.isArray(req.body[key]) && req.body[key].length === 0));

		if (missingParams.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Missing or empty required body parameters',
				missingParams: missingParams,
			});
		}
		next();
	};
}