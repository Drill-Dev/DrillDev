import { FastifyInstance } from 'fastify';

import { drillCreateRoute } from './create';
import { drillSubmitRoute } from './submit';
import { drillUpdateRoute } from './update';

export function drillRoutes(app: FastifyInstance) {
	drillCreateRoute(app);
	drillSubmitRoute(app);
	drillUpdateRoute(app);
}
