import { FastifyInstance } from 'fastify';

export default async function drillCreateRoute(app: FastifyInstance) {
	app.post('/drill/create', async (request, reply) => {
		const fileData = await request.file();
		const codeBuffer = await fileData.toBuffer();
		const code = codeBuffer.toString("utf-8");
		const { id } = await request.prisma.drill.create({
			data: {
				judgingCode: code,
				judgingOptions: {},
			},
		});
		await reply.send({ id });
	});
}
