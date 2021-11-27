import type { FastifyInstance } from 'fastify';

type CreateDrillBody = {
	code: string;
	instructions: string;
	executor: string;
};

export default async function drillCreateRoute(app: FastifyInstance) {
	app.post('/drills', async (request, reply) => {
		const { code, instructions, executor } = request.body as CreateDrillBody;

		const { id } = await request.prisma.drill.create({
			data: {
				judgingCode: code,
				instructions,
				judgingExecutor: executor,
				creatorId: request.accountId,
			},
		});
		await reply.send({ id });
	});
}
