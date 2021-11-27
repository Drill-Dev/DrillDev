import type { FastifyInstance } from 'fastify';

export default async function profileRoute(app: FastifyInstance) {
	app.get(
		'/accounts/profile',
		{ preValidation: app.authenticate },
		async (request, reply) => {
			const accountId = request.account?.id ?? '';
			const result = await request.prisma.account.findUnique({
				select: {
					id: true,
					username: true,
				},
				where: {
					id: accountId,
				},
			});
			reply.send(result);
		}
	);

	app.get('/accounts/:accountId/profile', async (request, reply) => {
		const accountId = (request.params as { accountId: string }).accountId;
		const result = await request.prisma.account.findUnique({
			select: {
				id: true,
				username: true,
			},
			where: {
				id: accountId,
			},
		});
		reply.send(result);
	});
}
