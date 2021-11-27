import nodemailer from 'nodemailer';

type SendEmailProps = {
	to: string;
	subject: string;
	html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailProps) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT ?? 587),
		secure: process.env.SMTP_PORT === '465',
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	await transporter.sendMail({
		from: 'DrillDev <noreply@drilldev.com>',
		to,
		subject,
		html,
	});
}
