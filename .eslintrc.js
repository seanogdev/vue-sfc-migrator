module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    "oclif",
    "oclif-typescript",
    "airbnb-typescript/base"
  ],
  rules: {
    '@typescript-eslint/dot-notation': 0
  },
}
