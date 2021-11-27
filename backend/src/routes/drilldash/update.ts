import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export default async function drilldashUpdateRoute(app: FastifyInstance) {
	app.patch('/drilldashes', async (request, reply) => {
		// TODO
		reply.status(StatusCodes.NOT_IMPLEMENTED);
	});
}
