import { PrismaClient } from '@prisma/client';
import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const prismaClient: FastifyPluginCallback<Record<string, never>> = async (
	app,
	options,
	next
) => {
	if (app.prisma) {
		return next(new Error('fastify-prisma-client has been defined before'));
	}

	const prisma = new PrismaClient();

	await prisma.$connect();
	app
		.decorate('prisma', prisma)
		.decorateRequest('prisma', app.prisma)
		.addHook('onClose', async (closedApp, done) => {
			closedApp.prisma.$disconnect();
			done();
		});
};

const fastifyPrismaPlugin = fp(prismaClient, {
	name: 'fastify-prisma-client',
});

export default fastifyPrismaPlugin;

declare module 'fastify' {
	interface FastifyRequest {
		prisma: PrismaClient;
	}
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}
