// Model Improvements
import db from '../config/db';
import { generateListId } from '../utils/nanoIds';

interface List {
    list_id: string;
    user_id: number;
    title: string;
    createdAt: Date;
}

export async function createList(userId: string, name: string): Promise<List> {
	try {
		const result = await db.query(
			'INSERT INTO lists (list_id, user_id, title) VALUES ($1, $2, $3) RETURNING *',
			[await generateListId(), userId, name],
		);
		return result.rows[0];
	}
	catch (error) {
		console.error('Error creating list:', error);
		throw new Error('Failed to create list');
	}
}

export async function getLists(userId: string): Promise<{ list_id: string; title: string }[]> {
	try {
		const result = await db.query(
			'SELECT list_id, title FROM lists WHERE user_id = $1',
			[userId],
		);
		return result.rows;
	}
	catch (error) {
		console.error('Error fetching lists:', error);
		throw new Error('Failed to fetch lists');
	}
}

export async function getListById(listId: string): Promise<List | null> {
	try {
		const result = await db.query(
			'SELECT * FROM lists WHERE list_id = $1',
			[listId],
		);
		return result.rowCount > 0 ? result.rows[0] : null;
	}
	catch (error) {
		console.error('Error fetching list by ID:', error);
		throw new Error('Failed to fetch list');
	}
}

export async function updateList(listId: string, newTitle: string): Promise<List> {
	try {
		const result = await db.query(
			'UPDATE lists SET title = $1 WHERE list_id = $2 RETURNING *',
			[newTitle, listId],
		);
		return result.rows[0];
	}
	catch (error) {
		console.error('Error updating list:', error);
		throw new Error('Failed to update list');
	}
}

export async function deleteList(listId: string): Promise<void> {
	try {
		await db.query(
			'DELETE FROM lists WHERE list_id = $1',
			[listId],
		);
	}
	catch (error) {
		console.error('Error deleting list:', error);
		throw new Error('Failed to delete list');
	}
}