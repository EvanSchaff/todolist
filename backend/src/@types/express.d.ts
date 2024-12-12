import { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/userModels';
import { List } from '../models/listModels';
import { Task } from '../models/taskModels';


declare global {
	namespace Express {
		interface Request {
			token?: JwtPayload;
			targetUser?: User;
			targetList?: List
			targetTask?: Task
			dueDate?: Date
		}
	}
}