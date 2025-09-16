import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Base config
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    // 👇 add overrides
    files: ["app/**/page.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off", // disable for Next.js pages
    },
  },
];

export default eslintConfig;
