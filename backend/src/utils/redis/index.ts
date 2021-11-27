import Redis from 'ioredis';

export const redis = new Redis({
	host: process.env.REDIS_HOST,
	port: Number.parseInt(process.env.REDIS_PORT ?? '6379', 10),
	username: process.env.REDIS_USERNAME,
	password: process.env.REDIS_PASSWORD,
});
