import fp from 'fastify-plugin';

async function authPlugin() {
	/* empty */
}

const fastifyAuthPlugin = fp(authPlugin, {
	name: 'fastify-prisma-client',
});

export default fastifyAuthPlugin;
