import ky from 'ky';

export const serverKy = ky.extend({
	prefixUrl: import.meta.env.VITE_SERVER_URL,
});
