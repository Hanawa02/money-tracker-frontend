module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "prettier",
    "@vue/eslint-config-typescript",
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "vue/no-unused-vars": ["error"],
    "eol-last": "error",
    "prettier/prettier": ["error"],
    "vue/require-default-prop": "off",
    "max-len": [
      "error",
      {
        code: 120,
        ignorePattern: 'd="([\\s\\S]*?)"',
      },
    ],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["src/locales/**/*.ts"], // Or *.test.js
      rules: {
        "max-len": "off",
      },
    },
  ],
};
