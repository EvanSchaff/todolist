import db from '../config/db';
import { generateTaskId } from '../utils/nanoIds';

interface Task {
    task_Id: string;
    list_Id: number;
    description: string;
    dueDate: Date | null;
    createdAt: Date;
    isCompleted: boolean;
    completedAt: Date | null;
}

export async function createTask(listId: string, description: string, dueDate?: Date | null): Promise<Task> {
	try {
		const result = await db.query(
			`INSERT INTO tasks (task_id, list_id, description, due_date)
            VALUES ($1, $2, $3, $4) RETURNING task_id, list_id, description, due_date, created_at, is_completed, completed_at`,
			[await generateTaskId(), listId, description, dueDate ?? null],
		);
		return result.rows[0];
	}
	catch (error) {
		console.error('Error creating task:', error);
		throw new Error('Failed to create task');
	}
}

export async function getTasks(listId: string): Promise<Task[]> {
	try {
		const result = await db.query(
			`SELECT task_id, list_id, description, due_date, created_at, is_completed, completed_at 
            FROM tasks WHERE list_id = $1`,
			[listId],
		);
		return result.rows;
	}
	catch (error) {
		console.error('Error retrieving tasks:', error);
		throw new Error('Failed to fetch tasks');
	}
}

export async function getTaskById(taskId: string): Promise<Task | null> {
	try {
		const result = await db.query(
			`SELECT task_id, list_id, description, due_date, created_at, is_completed, completed_at 
            FROM tasks WHERE task_id = $1`,
			[taskId],
		);
		return result.rowCount > 0 ? result.rows[0] : null;
	}
	catch (error) {
		console.error('Error fetching task by ID:', error);
		throw new Error('Failed to fetch task');
	}
}

export async function updateTask(taskId: string, description: string, dueDate: Date | null): Promise<Task> {
	try {
		const result = await db.query(
			`UPDATE tasks 
             SET description = $1, due_date = $2 
             WHERE task_id = $3 
             RETURNING task_id, list_id, description, due_date, created_at, is_completed, completed_at`,
			[description, dueDate, taskId],
		);
		return result.rows[0];
	}
	catch (error) {
		console.error('Error updating task:', error);
		throw new Error('Failed to update task');
	}
}

export async function deleteTask(taskId: string): Promise<void> {
	try {
		await db.query('DELETE FROM tasks WHERE task_id = $1', [taskId]);
	}
	catch (error) {
		console.error('Error deleting task:', error);
		throw new Error('Failed to delete task');
	}
}

export async function toggleTaskCompletion(taskId: string): Promise<Task> {
	try {
		const result = await db.query(
			`UPDATE tasks 
             SET is_completed = NOT is_completed, 
                 completed_at = CASE 
                     WHEN NOT is_completed THEN CURRENT_TIMESTAMP 
                     ELSE NULL 
                 END 
             WHERE task_id = $1 
             RETURNING task_id, list_id, description, due_date, created_at, is_completed, completed_at`,
			[taskId],
		);
		return result.rows[0];
	}
	catch (error) {
		console.error('Error toggling task completion:', error);
		throw new Error('Failed to toggle task completion');
	}
}
