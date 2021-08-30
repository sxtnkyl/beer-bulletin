const webpack = require("webpack");
const { parsed: myEnv } = require("dotenv").config();

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
  env: {
    api: process.env.PORT + "api/",
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    //   mySecret: 'secret',
    //   secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    apiUrl: "api",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/public",
  },
  // webpack(config, options) {
  //   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //     config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));
  //     config.node = {
  //       ...(config.node || {}),
  //       net: 'empty',
  //       tls: 'empty',
  //       dns: 'empty',
  //       fs: 'empty',
  //     };
  //     return config;
  //   },
};
