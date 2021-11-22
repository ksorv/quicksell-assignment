module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'max-len': [1, { code: 80 }],
    semi: 'off',
    'comma-dangle': 'off',
  },
}
