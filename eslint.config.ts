import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
	{ 
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
		plugins: { 
			js,
			'@stylistic': stylistic
		}, 
		languageOptions: { globals: globals.node }, 
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "error",
			// "no-console": "warn",
			"@typescript-eslint/array-type": ["warn", { "default": "array" }],
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@stylistic/indent": ["error", 4]
		},
		extends: [tseslint.configs.recommended], 
	},
  {
    files: ["eslint.config.ts"],
    rules: {
      "@stylistic/indent": "off",
    },
  }
]);
