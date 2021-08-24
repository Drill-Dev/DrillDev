module.exports = {
	extends: ['../.eslintrc.js'],
	overrides: [
		{
			files: ['*.vue', '*.d.ts'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
	parserOptions: {
		extraFileExtensions: ['.vue'],
		parser: '@typescript-eslint/parser',
		project: ['./tsconfig.eslint.json'],
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	env: {
		node: true,
		browser: true,
	},
	extends: ['plugin:vue/vue3-recommended'],
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [['~', './src']],
				extensions: ['.js', '.ts', '.vue'],
			},
		},
	},
};
