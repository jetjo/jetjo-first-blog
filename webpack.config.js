const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        // test: /\.(j|t)s$/,
        test: /\.m?ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
              // appendTsSuffixTo: [/TS\.vue$/],
            },
          },
        ],
        exclude:
          /node_modules\/(?!(ant-design-vue|bootstrap|bootstrap-vue-3)\/).*/,
      },
    ],
  },
  // Other rules...
  // plugins: [new NodePolyfillPlugin()],
  plugins: [
    new NodePolyfillPlugin({
      // `console`会引发异常
      //  ERROR #98124  WEBPACK.DEVELOP

      // Generating development JavaScript bundle failed

      // Can't resolve 'object.assign/polyfill' in '/Users/loong/project/blog/jetjo-first-blog/node_modules/.pnpm/assert@2.1.0/node_modules/assert/build'

      // If you're trying to use a package make sure that 'object.assign/polyfill' is installed. If you're trying to use a local file make sure that the path is correct.

      // File: node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js:45:19

      // failed Building development bundle - 7.941s
      // ERROR in ./node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js 45:19-52
      // Module not found: Error: Can't resolve 'object.assign/polyfill' in '/Users/loong/project/blog/jetjo-first-blog/node_modules/.pnpm/assert@2.1.0/node_modules/assert/build'
      //  @ ./node_modules/.pnpm/console-browserify@1.2.0/node_modules/console-browserify/index.js 3:13-30
      excludeAliases: ["console"],
    }),
  ],
};
