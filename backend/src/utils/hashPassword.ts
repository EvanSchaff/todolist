import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}
	catch (err) {
		console.error('Error hashing password:', err);
	}
}
