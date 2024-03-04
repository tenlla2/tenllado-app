module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    camelcase: "error",
    "no-duplicate-imports": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "no-alert": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": 0,
    "react/display-name": 0,
    "@typescript-eslint/no-empty-function": "off",
    "react/no-unknown-property": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/consistent-type-imports": "error",
  },
};
