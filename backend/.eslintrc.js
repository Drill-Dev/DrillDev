/* eslint-env node */

module.exports = {
	extends: ['../.eslintrc.js'],
	overrides: [
		{
			files: ['src/routes/**/*.ts', 'src/plugins/**/*.ts'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	settings: {
		'import/resolver': {
			alias: {
				map: [['~', './src']],
				extensions: ['.js', '.ts'],
			},
		},
	},
};
