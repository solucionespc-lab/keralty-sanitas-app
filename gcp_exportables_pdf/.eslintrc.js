module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['/lib/**/*'],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    quotes: ['warn', 'single'],
    'require-jsdoc': 0,
    'import/no-unresolved': 0,
    'prefer-arrow-callback': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'import/extensions': [
      'error',
      { js: 'never', json: 'always', ts: 'never' },
    ],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          ['external', 'builtin'],
          'index',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '../modulos/*/Resolvers',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '../modulos/*/Schema',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '../seguridad/*',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
  },
};
