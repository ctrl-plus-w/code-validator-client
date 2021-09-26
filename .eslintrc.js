module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals', 'prettier', 'airbnb', 'next'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],

    'react/jsx-props-no-spreading': 'off',

    'arrow-body-style': 'off',

    'import/no-duplicates': 'off',
    'object-curly-newline': 'off',
  },
  overrides: [
    {
      files: ['_document.tsx', '_document.ts'],
      rules: {
        '@next/next/no-document-import-in-page': 'off',
      },
    },
  ],
};
