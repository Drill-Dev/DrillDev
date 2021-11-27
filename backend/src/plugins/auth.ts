import type {
	FastifyPluginCallback,
	FastifyReply,
	FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
import { StatusCodes } from 'http-status-codes';

import { redis } from '~/utils/redis';
import { sessionTokenK } from '~/utils/redis/keys';

const auth: FastifyPluginCallback<Record<string, never>> = async (
	app,
	_options,
	_next
) => {
	app.decorate(
		'authenticate',
		async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const cookies = request.cookies;
				const sessionToken = reply.unsignCookie(cookies['__HOST-auth']);
				if (!sessionToken.valid || !sessionToken.value) {
					throw new Error('Invalid session cookie.');
				}
				const account = {
					id: (await redis.get(sessionTokenK(sessionToken.value))) ?? '',
					sessionToken: sessionToken.value,
				};
				if (!account.id) {
					throw new Error('Invalid or expired session token.');
				}
				request.account = account;
			} catch (error) {
				reply.status(StatusCodes.UNAUTHORIZED).send(error);
			}
		}
	);
};

const fastifyAuthPlugin = fp(auth, { name: 'fastify-auth-plugin' });

export default fastifyAuthPlugin;

declare module 'fastify' {
	interface FastifyInstance {
		authenticate: () => void;
	}
	interface FastifyRequest {
		account?: {
			id: string;
			sessionToken: string;
		};
	}
}
