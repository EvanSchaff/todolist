import { Request, Response, NextFunction } from 'express';

export function validateParams(paramKeys: string[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const missingParams = paramKeys.filter((key) => !req.params[key] ||
		(typeof req.params[key] === 'string' && req.params[key].trim() === ''));

		if (missingParams.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Missing or empty required parameters',
				missingParams: missingParams,
			});
		}
		next();
	};
}