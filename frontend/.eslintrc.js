module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js', 'vite.config.ts'],
  settings: {
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
  },
  plugins: ['react', 'import', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 0,
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    'prefer-arrow-callback': 'error',
    'no-undef': 'off',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          ['external', 'builtin'],
          'internal',
          ['parent', 'sibling', 'index'],
          ['object', 'type'],
        ],
        alphabetize: {
          order: 'desc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: './estilos/*',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '../estilos/*',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '../../estilos/*',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: './peticiones/*',
            group: 'sibling',
            position: 'after',
          },
          {
            pattern: '../peticiones/*',
            group: 'sibling',
            position: 'after',
          },
        ],
      },
    ],
  },
};
