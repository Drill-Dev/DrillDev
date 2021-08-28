/* eslint-env node */

module.exports = {
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
	extends: ['../.eslintrc.js', 'plugin:vue/vue3-recommended', 'prettier'],
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'unicorn/filename-case': [
			'error',
			{
				cases: {
					pascalCase: true,
					kebabCase: true,
				},
			},
		],
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
