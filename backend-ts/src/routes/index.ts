import { FastifyInstance } from 'fastify';

import { accountRoutes } from './account';
import { drillRoutes } from './drill';
import { drilldashRoutes } from './drilldash';
import { submissionRoutes } from './submission';

export function routes(app: FastifyInstance) {
	accountRoutes(app);
	drillRoutes(app);
	drilldashRoutes(app);
	submissionRoutes(app);
}
