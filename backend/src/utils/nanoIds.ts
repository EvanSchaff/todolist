import { nanoid } from 'nanoid';
import { getUserById } from '../models/userModels';
import { getListById } from '../models/listModels';
import { getTaskById } from '../models/taskModels';

export async function generateUserId(): Promise<string> {
	let id : string;
	let isDuplicate = true;
	while (isDuplicate) {
		id = nanoid(8);
		const existing = await getUserById(id);
		if (existing === null) {
			isDuplicate = false;
		}
	}
	return id;
}

export async function generateListId(): Promise<string> {
	let id : string;
	let isDuplicate = true;
	while (isDuplicate) {
		id = nanoid(10);
		const existing = await getListById(id);
		if (existing === null) {
			isDuplicate = false;
		}
	}
	return id;
}

export async function generateTaskId(): Promise<string> {
	let id : string;
	let isDuplicate = true;
	while (isDuplicate) {
		id = nanoid(12);
		const existing = await getTaskById(id);
		if (existing === null) {
			isDuplicate = false;
		}
	}
	return id;
}
