import bcrypt from 'bcrypt';
import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { generateSessionToken } from '~/utils/generate-session-token';

type LoginBody = {
	username?: string;
	email?: string;
	password: string;
};

export default async function loginRoute(app: FastifyInstance) {
	app.post('/auth/login', async (request, reply) => {
		const { username, email, password } = request.body as LoginBody;

		let result;
		if (username !== undefined) {
			result = await request.prisma.account.findFirst({
				select: {
					id: true,
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
					id: true,
					passwordHash: true,
				},
				where: {
					email: {
						equals: email,
					},
				},
			});
		} else {
			return reply
				.status(StatusCodes.BAD_REQUEST)
				.send('At least one of username or email must be provided.');
		}

		if (result === null) {
			return reply
				.status(StatusCodes.UNAUTHORIZED)
				.send('Incorrect username or password.');
		}

		if (await bcrypt.compare(password, result.passwordHash)) {
			return reply
				.status(StatusCodes.OK)
				.setCookie('__HOST-auth', await generateSessionToken(result.id), {
					path: '/',
					httpOnly: true,
					secure: true,
					signed: true,
				})
				.send('Successfully logged in.');
		} else {
			return reply
				.status(StatusCodes.UNAUTHORIZED)
				.send('Incorrect username or password.');
		}
	});
}
