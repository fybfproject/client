module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    'no-console': 'warn',
    "react/jsx-key": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
   settings: {
    next: {
      rootDir: ["../../apps/*/"],
    },
  },
};
