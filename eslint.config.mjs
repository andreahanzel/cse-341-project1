// eslint.config.mjs
import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
      prettier
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          semi: true,
          tabWidth: 2,
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'none',
          bracketSpacing: true,
          bracketSameLine: false, // Replaces jsxBracketSameLine
          endOfLine: 'lf' // Enforces Unix-style line endings
        }
      ],
      'linebreak-style': ['error', 'unix'] // Ensures Unix line endings (LF)
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
