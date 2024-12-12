import db from '../config/db';
import { readFileSync } from 'fs';

async function _checkTablesExist(): Promise<boolean> {
	try {
		const checkTablesQuery = `SELECT COUNT(*) = 4 AS all_tables_exist
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name IN ('users', 'lists', 'tasks', 'blacklisted_tokens');`;

		const { rows } = await db.query(checkTablesQuery);
		return rows[0].all_tables_exist;
	}
	catch (err) {
		throw err;
	}
}

async function _createTables() {
	try {
		const sql = readFileSync('src/sql/createTables.sql', 'utf-8');
		console.log('Running SQL:', sql);
		await db.query(sql);
	}
	catch (err) {
		throw err;
	}
}

async function _initDB() {
	try {
		if (!await _checkTablesExist()) {
			await _createTables();
			console.log('Database tables created successfully');
		}
		console.log('Database successfully initialized');
	}
	catch (err) {
		throw err;
	}
	finally {
		await db.end();
	}

}

_initDB().catch(err => {
	console.error('Initialization failed:', err);
	process.exit(1);
});