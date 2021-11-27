import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export default async function drillUpdateRoute(app: FastifyInstance) {
	app.patch('/drills', async (request, reply) => {
		// TODO
		reply.status(StatusCodes.NOT_IMPLEMENTED);
	});
}
