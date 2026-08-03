export default [
  {
    ignores: ['node_modules/**', '.venv/**', 'backups/**', 'artifacts/**', 'logs/**', '.local/**', 'elektron-digital-twin-foundation/**', 'engine/**', 'edts-*/**'],
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
