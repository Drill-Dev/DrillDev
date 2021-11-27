import type { FastifyInstance } from 'fastify';

import { redis } from '~/utils/redis';
import { sessionTokenK } from '~/utils/redis/keys';

export default async function logoutRoute(app: FastifyInstance) {
	app.post(
		'/auth/logout',
		{ preValidation: app.authenticate },
		async (request, reply) => {
			if (!request.account) throw new Error('not authenticated');
			redis.del(sessionTokenK(request.account.sessionToken));
			reply.clearCookie('__HOST-auth').send('Successfully logged out.');
		}
	);
}
