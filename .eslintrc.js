module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "plugin:@shopify/typescript",
    "plugin:@shopify/react",
    "plugin:@shopify/prettier",
  ],
  parserOptions: {
    project: "tsconfig.json",
  },
  ignorePatterns: ["*.config.js"],
  rules: {
    "@shopify/typescript/prefer-pascal-case-enums": "off",
    "@shopify/jsx-prefer-fragment-wrappers": "off",
    "react/no-unescaped-entities": "off",
    "@shopify/jsx-no-complex-expressions": "off",
    "@shopify/jsx-no-hardcoded-content": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
  },
};
