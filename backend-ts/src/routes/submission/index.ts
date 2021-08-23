import { FastifyInstance } from 'fastify';

import { getSubmissionResultsRoute } from './getResults';
import { getSubmissionSourceRoute } from './getSource';

export function submissionRoutes(app: FastifyInstance) {
	getSubmissionResultsRoute(app);
	getSubmissionSourceRoute(app);
}
