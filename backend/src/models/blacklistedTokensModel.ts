import db from '../config/db';

export async function blacklistToken(token: string, expiresAt: Date): Promise<void> {
	try {
		await db.query(
			`INSERT INTO blacklisted_tokens (token, expires_at)
            VALUES ($1, $2) 
            ON CONFLICT (token) DO NOTHING;`,
			[token, expiresAt],
		);
	}
	catch (err) {
		console.error('Error blacklisting token:', err);
		throw new Error('Database error during token blacklist operation');
	}
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
	try {
		const result = await db.query(
			`SELECT 1 FROM blacklisted_tokens
            WHERE token = $1 AND expires_at > NOW();`,
			[token],
		);
		return result.rowCount > 0;
	}
	catch (err) {
		console.error('Error checking token blacklist:', err);
		throw new Error('Database error during token blacklist check');
	}
}

export async function cleanupExpiredTokens(): Promise<number> {
	try {
		const result = await db.query(
			`DELETE FROM blacklisted_tokens
            WHERE expires_at <= NOW();`,
		);
		return result.rowCount;
	}
	catch (err) {
		console.error('Error cleaning up expired tokens:', err);
		throw new Error('Database error during expired token cleanup');
	}
}