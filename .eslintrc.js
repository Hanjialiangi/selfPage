const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  globals: {},
  plugins: [
    '@typescript-eslint',
    'react',
    'react-redux',
    'react-hooks',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-redux/recommended',
    //'plugin:import/errors',
    //'plugin:import/warnings',
    'plugin:react-hooks/recommended'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './webpack.config.dev.js')
      }
    },
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_'
          }
        ]
      }
    }
  ],
  rules: {
    // 'react/prop-types': 0,
    // 'react/no-unused-state': 2,
    // 'react-redux/prefer-separate-component-file': 0,
    // 'no-console': 'warn',
    // 'no-constant-condition': ['error', { checkLoops: false }],
    // 'no-debugger': 'warn',
    // 'no-empty': 'warn',
    // 'no-func-assign': 'off',
    // 'no-inner-declarations': ['error', 'both'],
    // 'no-fallthrough': 'off',
    // 'no-undef': ['error', { typeof: true }],
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     args: 'all',
    //     argsIgnorePattern: '^_'
    //   }
    // ],
    // 'block-scoped-var': 'warn',
    // 'no-use-before-define': ['error', 'nofunc'],
    // 'no-tabs': 'error',
    // 'prefer-const': [
    //   'error',
    //   {
    //     destructuring: 'all'
    //   }
    // ]
  }
};
