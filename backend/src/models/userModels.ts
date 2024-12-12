import db from '../config/db';
import { generateUserId } from '../utils/nanoIds';

interface User {
    user_id: string;
    username: string;
    password_hash: string;
}

export async function createUser(username: string, passwordHash: string): Promise<User> {
	try {
		const result = await db.query(
			`INSERT INTO users (user_id, username, password_hash)
            VALUES ($1, $2, $3) RETURNING *`,
			[await generateUserId(), username, passwordHash],
		);
		return result.rows[0];
	}
	catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Failed to create user');
	}
}

export async function deleteUser(userId: string): Promise<void> {
	try {
		await db.query(
			'DELETE FROM users WHERE user_id = $1',
			[userId],
		);
	}
	catch (error) {
		console.error('Error deleting user:', error);
		throw new Error('Failed to delete user');
	}
}

export async function fetchUserByName(username: string): Promise<User | null> {
	try {
		const result = await db.query(
			'SELECT * FROM users WHERE username = $1',
			[username],
		);
		return result.rowCount > 0 ? result.rows[0] : null;
	}
	catch (error) {
		console.error('Error fetching user by name:', error);
		throw new Error('Failed to fetch user');
	}
}

export async function getUserById(user_id: string): Promise<User | null> {
	try {
		const result = await db.query(
			'SELECT * FROM users WHERE user_id = $1',
			[user_id],
		);
		return result.rowCount > 0 ? result.rows[0] : null;
	}
	catch (error) {
		console.error('Error fetching user by ID:', error);
		throw new Error('Failed to fetch user');
	}
}

export async function wipeUsersTable(): Promise<void> {
	try {
		await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
	}
	catch (error) {
		console.error('Error wiping users table:', error);
		throw new Error('Failed to wipe users table');
	}
}