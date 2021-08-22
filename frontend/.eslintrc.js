module.exports = {
	// https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
	// Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
	// `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
	parserOptions: {
		// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
		// https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
		// Needed to make the parser take into account 'vue' files
		extraFileExtensions: ['.vue'],
		parser: '@typescript-eslint/parser',
		project: ['./tsconfig.eslint.json'],
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},

	env: {
		node: true,
		browser: true,
	},

	// Rules order is important, please avoid shuffling them
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'prettier',
	],

	plugins: [
		// required to apply rules which need type information
		'@typescript-eslint',
		'simple-import-sort',
		'import',

		// https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
		// required to lint *.vue files
		'vue',
	],

	// add your custom rules here
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
