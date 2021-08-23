import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';

interface LoginBody {
	username?: string;
	email?: string;
	password: string;
}

export default async function loginRoute(app: FastifyInstance) {
	app.post('/login', async (request, reply) => {
		const { username, email, password } = request.body as LoginBody;

		let result;
		if (username !== undefined) {
			result = await request.prisma.account.findFirst({
				select: {
					passwordHash: true,
				},
				where: {
					username: {
						equals: username,
					},
				},
			});
		} else if (email !== undefined) {
			result = await request.prisma.account.findFirst({
				select: {
					passwordHash: true,
				},
				where: {
					email: {
						equals: email,
					},
				},
			});
		} else {
			return reply.send('At least one of username or email must be provided.');
		}

		if (result === null) {
			return reply.send('Incorrect username or password.');
		}

		if (await bcrypt.compare(password, result.passwordHash)) {
			// TODO: Create login tokens
			return reply.status(200);
		} else {
			return reply.send('Incorrect username or password.');
		}
	});
}
