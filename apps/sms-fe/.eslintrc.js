module.exports = {
  ...require('config/eslint-sms-fe.js'),
  parserOptions: {
    ecma: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
