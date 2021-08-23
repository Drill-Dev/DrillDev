import 'tsconfig-paths/register';

import fastify from 'fastify';
import fastifyAutoload from 'fastify-autoload';
import fastifyCors from 'fastify-cors';
import fastifyMultipart from 'fastify-multipart';
import path from 'path';

const app = fastify({
	logger: true,
});
app.register(fastifyMultipart);
app.register(fastifyCors);

// Load all plugins
app.register(fastifyAutoload, {
	dir: path.join(__dirname, 'plugins'),
});

// Load all routes
app.register(fastifyAutoload, {
	dir: path.join(__dirname, 'routes'),
	dirNameRoutePrefix: false
});

app.listen(5000, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	} else {
		console.log(`Listening at ${address}`);
	}
});
