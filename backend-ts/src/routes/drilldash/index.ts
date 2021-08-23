import { FastifyInstance } from 'fastify';

import { drilldashCreateRoute } from './create';
import { drilldashUpdateRoute } from './update';

export function drilldashRoutes(app: FastifyInstance) {
	drilldashCreateRoute(app);
	drilldashUpdateRoute(app);
}
