const path = require('path');

module.exports = {
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
};
