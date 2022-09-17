const withTM = require("next-transpile-modules")(["@fybf/shared.ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
