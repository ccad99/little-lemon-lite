module.exports = {
   root: true,
   env: {
      browser: true,
      es2020: true,
      jest: true,
   },
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:jest/recommended",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
   },
   settings: { react: { version: "18.2" } },
   plugins: ["react", "react-refresh", "jest"],
   rules: {
      "react-refresh/only-export-components": [
         "warn",
         { allowConstantExport: true },
      ],
   },
};
