const withTM = require("next-transpile-modules")(["@fybf/shared.ui", "@fybf/shared.services", "@fybf/shared.theme"]);

require("dotenv").config({
  path: './.env'
});

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});
