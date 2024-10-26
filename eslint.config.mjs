import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-console": "warn",
      "no-eval": "error",
      eqeqeq: ["error", "always"],

      // ...rules,
      "no-unused-vars": ["warn", { args: "all", argsIgnorePattern: "^_" }],
      "no-undef": "error",

      "no-constant-condition": "warn",
      "no-duplicate-imports": "error",
      "no-useless-constructor": "error",
      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
