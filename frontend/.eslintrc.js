module.exports = {
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
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'prettier',
	],
	plugins: [
		'@typescript-eslint',
		'simple-import-sort',
		'import',
		'vue',
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars-experimental': [
			'error',
			{ ignoreArgsIfArgsAfterAreUsed: true },
		],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-param-reassign': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				ts: 'never',
			},
		],
		'vue/html-indent': ['error', 'tab'],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false,
			},
		],
		'no-lonely-if': 'off',
		'no-void': 'off',
		'no-underscore-dangle': 'off',
		'no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-expressions': 'error',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'error',
		'prefer-destructuring': [
			'error',
			{
				array: false,
			},
		],
		'no-await-in-loop': 'off',
		'no-else-return': 'off',
		'import/no-default-export': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
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
