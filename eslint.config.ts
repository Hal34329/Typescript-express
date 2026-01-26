import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	globalIgnores(["build"]),
	{ 
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
		plugins: { 
			js,
			"@stylistic": stylistic,
		}, 
		languageOptions: { globals: globals.node }, 
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn", {
					// "args": "all",
					"argsIgnorePattern": "^_",
					// "caughtErrors": "all",
					// "caughtErrorsIgnorePattern": "^_",
					// "destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true,
				}],
			"@typescript-eslint/no-explicit-any": "error",
			// "no-console": "warn",
			"@typescript-eslint/array-type": ["warn", { "default": "array" }],
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@stylistic/indent": ["error", 4],
			"@stylistic/quotes": ["warn", "double"],
			"@stylistic/semi": ["warn", "always"],
			"@stylistic/object-curly-spacing": ["warn", "always"],
			"@stylistic/comma-spacing": "warn",
			"@stylistic/comma-dangle": ["warn", "always-multiline"],
		},
		extends: [tseslint.configs.recommended], 
	},
  {
    files: ["eslint.config.ts"],
    rules: {
      "@stylistic/indent": "off",
    },
  },
]);
