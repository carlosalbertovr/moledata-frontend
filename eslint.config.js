// eslint.config.js

import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginUnused from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		extends: ["eslint:recommended", "plugin:react/recommended"],
		settings: {
			react: {
				version: "detect",
			},
			"import/resolver": {
				node: {
					paths: ["src"],
					moduleDirectory: ["node_modules", "src"],
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
			},
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 12,
				sourceType: "module",
			},
			globals: globals.browser,
		},
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			import: eslintPluginImport,
			"unused-imports": eslintPluginUnused,
			react: pluginReact,
			prettier: eslintPluginPrettier,
			"react-refresh": reactRefresh,
		},
		rules: {
			"react-hooks/exhaustive-deps": 0,
			"react/prop-types": "off",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
			"react/jsx-props-no-spreading": "off",
			"react/react-in-jsx-scope": "off",
			"prettier/prettier": [
				"error",
				{
					printWidth: 120,
					endOfLine: "lf",
				},
			],
			"import/no-extraneous-dependencies": "off",
			"import/extensions": "off",
			"no-unused-vars": "off",
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": [0],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"unused-imports/no-unused-vars": "off",
			"unused-imports/no-unused-imports": "warn",
			"max-len": [2, { code: 140, ignorePattern: "^import .*" }],
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "internal"],
					pathGroups: [
						{
							pattern: "react",
							group: "external",
							position: "before",
						},
					],
					pathGroupsExcludedImportTypes: ["react"],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
			"no-console": "warn",
			"padding-line-between-statements": [
				"warn",
				{ blankLine: "always", prev: "*", next: "return" },
				{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
				{
					blankLine: "any",
					prev: ["const", "let", "var"],
					next: ["const", "let", "var"],
				},
			],
		},
	},
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			import: eslintPluginImport,
			"unused-imports": eslintPluginUnused,
			prettier: eslintPluginPrettier,
			"react-refresh": reactRefresh,
		},
	},
];
