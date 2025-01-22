import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend the existing Next.js ESLint configurations
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Disable the rule for any
      '@typescript-eslint/no-unused-vars': 'off', // Disable the rule for unused vars
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];

export default eslintConfig;