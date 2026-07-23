export default [
  {
    ignores: ['node_modules/**', '.venv/**', 'backups/**', 'logs/**', 'elektron-digital-twin-foundation/**', 'edts-*/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];
