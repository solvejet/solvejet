import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // TypeScript Rules - Removed type-checking rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Code Quality
      "prefer-const": "error",
      "no-var": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // React Rules
      "react/no-danger": "warn",
      "react/jsx-key": "error",
      "react/no-unescaped-entities": "error",
    },
  },
  {
    // Config files
    files: ["**/*.config.{js,ts}", "**/middleware.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    // API routes
    files: ["**/api/**/*.ts", "**/route.ts"],
    rules: {
      "import/prefer-default-export": "off",
    },
  },
  {
    // App router pages
    files: ["**/app/**/page.tsx", "**/app/**/layout.tsx"],
    rules: {
      "import/prefer-default-export": "error",
    },
  },
  {
    // Test files
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
