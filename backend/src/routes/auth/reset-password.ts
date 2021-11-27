import bcrypt from 'bcrypt';
import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';

import { sendEmail } from '~/utils/send-email';

type ResetPasswordInitBody = {
	email: string;
};

type ResetPasswordVerifyBody = {
	token: string;
	password: string;
};

export default async function registerRoute(app: FastifyInstance) {
	app.post('/auth/request-password-reset', async (request, reply) => {
		const { email } = request.body as ResetPasswordInitBody;
		const result = await request.prisma.account.findUnique({
			select: {
				id: true,
			},
			where: {
				email,
			},
		});
		if (result) {
			const resetToken = nanoid();
			await request.prisma.passwordResetToken.create({
				data: {
					accountId: result.id,
					token: resetToken,
				},
			});
			await sendEmail({
				to: email,
				subject: 'Password reset for DrillDev',
				html: `Please click <a href="https://www.drilldev.com/password-reset?token=${resetToken}">here</a> to reset your password`,
			});
			return reply
				.status(StatusCodes.CREATED)
				.send('Check your email for further instructions');
		} else {
			return reply
				.status(StatusCodes.OK)
				.send('User with provided email does not exist.');
		}
	});

	app.post('/auth/reset-password', async (request, reply) => {
		const { token, password } = request.body as ResetPasswordVerifyBody;
		try {
			const result = await request.prisma.passwordResetToken.delete({
				select: {
					accountId: true,
				},
				where: {
					token,
				},
			});
			await request.prisma.account.update({
				data: {
					passwordHash: await bcrypt.hash(password, 10),
				},
				where: {
					id: result.accountId,
				},
			});
			return reply.status(StatusCodes.OK).send('Password successfully reset.');
		} catch {
			return reply
				.status(StatusCodes.UNAUTHORIZED)
				.send('Invalid or missing reset token.');
		}
	});
}
