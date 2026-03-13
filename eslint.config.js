import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "vendor/**",
      "public/**",
      "bootstrap/ssr/**",
      ".next/**",
      "out/**",
      "next-env.d.ts",
      "tailwind.config.js",
      "coverage/**",
      "*.min.js",
    ],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  {
    rules: {
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-tabs": "error",
      "no-mixed-spaces-and-tabs": "error",
      "padded-blocks": ["error", "never"],
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
    },
  },

  prettierConfig,
];

export default config;
