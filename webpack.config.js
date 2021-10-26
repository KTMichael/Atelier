var path = require("path");
var SRC_DIR = path.join(__dirname, "/Client/src");
var DIST_DIR = path.join(__dirname, "/Client/dist");

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
