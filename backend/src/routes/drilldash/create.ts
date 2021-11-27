import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export default async function drilldashCreateRoute(app: FastifyInstance) {
	app.post('/drilldashes', async (request, reply) => {
		// TODO
		reply.send(StatusCodes.NOT_IMPLEMENTED);
	});
}
