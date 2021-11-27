import 'dotenv/config';
import 'tsconfig-paths/register';

import fastify from 'fastify';
import fastifyAutoload from 'fastify-autoload';
import fastifyCookie from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import fastifyMultipart from 'fastify-multipart';
import path from 'path';

const app = fastify({
	logger: true,
});
app.register(fastifyMultipart);

app.register(fastifyCookie, {
	secret: process.env.COOKIE_SECRET,
});

app.register(fastifyCors, {
	origin: process.env.FRONTEND_URL,
	credentials: true,
});

// Load all plugins
app.register(fastifyAutoload, {
	dir: path.join(__dirname, 'plugins'),
});

// Load all routes
app.register(fastifyAutoload, {
	dir: path.join(__dirname, 'routes'),
	dirNameRoutePrefix: false,
});

app.listen(5000, (error, address) => {
	if (error) {
		console.error(error);
		throw error;
	} else {
		console.info(`Listening at ${address}`);
	}
});
