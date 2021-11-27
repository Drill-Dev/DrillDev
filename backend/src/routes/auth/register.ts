import type { Account } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';

import { generateSessionToken } from '~/utils/generate-session-token';

type RegisterBody = {
	username: string;
	email: string;
	password: string;
};

export default async function registerRoute(app: FastifyInstance) {
	app.post('/auth/register', async (request, reply) => {
		const { username, email, password } = request.body as RegisterBody;

		let result: Account | undefined;
		if (username && email && password) {
			try {
				result = await request.prisma.account.create({
					data: {
						id: nanoid(),
						email,
						username,
						passwordHash: await bcrypt.hash(password, 10),
					},
				});
			} catch {
				return reply
					.status(StatusCodes.CONFLICT)
					.send('Email or username already in use.');
			}
		} else {
			return reply
				.status(StatusCodes.BAD_REQUEST)
				.send('One or more required fields is empty.');
		}

		if (result) {
			return reply
				.status(StatusCodes.CREATED)
				.setCookie('__HOST-auth', await generateSessionToken(result.id), {
					path: '/',
					httpOnly: true,
					secure: true,
					signed: true,
				})
				.send('Success');
		} else {
			return reply.status(StatusCodes.BAD_REQUEST);
		}
	});
}
