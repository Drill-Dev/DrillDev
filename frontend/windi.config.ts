import { defineConfig } from 'vite-plugin-windicss';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	attributify: {
		prefix: 'w',
	},
	shortcuts: {
		column: 'flex flex-col',
		row: 'flex flex-row',
		center: 'items-center justify-center',
	},
});
