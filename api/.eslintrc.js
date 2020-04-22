module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  env: { jest: true, node: true },
  /* 
    "off" or 0 - turns rule off
    "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    "error" or 2 - turn the rule on as an error (exit code will be 1)
  */
  rules: {
    'no-console': 'warn',
    semi: 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js'],
      },
    },
  },
}
