/* eslint-env node */

module.exports = {
	extends: ['../.eslintrc.js'],
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
