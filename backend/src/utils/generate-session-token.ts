import { nanoid } from 'nanoid';

import { redis } from './redis';
import { sessionTokenK } from './redis/keys';

export async function generateSessionToken(accountId: string): Promise<string> {
	const sessionToken = nanoid();
	await redis.set(sessionTokenK(sessionToken), accountId);
	return sessionToken;
}
