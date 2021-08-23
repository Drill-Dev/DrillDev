import { FastifyInstance } from 'fastify';

import { loginRoute } from './login';
import { registerRoute } from './register';

export function accountRoutes(app: FastifyInstance) {
	loginRoute(app);
	registerRoute(app);
}
