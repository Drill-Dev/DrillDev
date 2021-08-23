import 'tsconfig-paths/register';

import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyMultipart from 'fastify-multipart';
import process from 'process';

import { routes } from './routes';

const app = fastify({
	logger: true,
});
app.register(fastifyMultipart);
app.register(fastifyCors);
app.register(routes);

app.listen(5000, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	} else {
		console.log(`Listening at ${address}`);
	}
});
