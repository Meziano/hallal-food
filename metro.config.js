const { withNativeWind } = require('nativewind/metro');
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname)
config.assets = ["./assets/fonts/"];
// config.sourceMaps = false;

module.exports = withNativeWind(config, { input: './app/globals.css' })