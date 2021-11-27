import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

type GetSubmissionParams = {
	submissionId: string;
};

export default async function getSubmission(app: FastifyInstance) {
	app.get('/submissions/:submissionId', async (request, reply) => {
		const { submissionId: _ } = request.params as GetSubmissionParams;

		// TODO
		reply.status(StatusCodes.NOT_IMPLEMENTED);
	});
}
