import { CronJob } from 'cron';
import { cleanupExpiredTokens } from '../models/blacklistedTokensModel';
import { wipeUsersTable } from '../models/userModels';

export const tokenCleanUp = new CronJob(
	'0 * * * *',
	() => {
		console.log('Running token cleanup...');
		cleanupExpiredTokens();
	},
	null,
	true,
);

export const demoCleanup = new CronJob(
	'0 0 * * *',
	() => {
		console.log('Wiping databases...');
		wipeUsersTable();
	},
	null,
	true,
);