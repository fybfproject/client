module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    'react/jsx-key': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
  settings: {
    next: {
      rootDir: ['../../apps/*/'],
    },
  },
};
