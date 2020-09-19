const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  target: "web",
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    hot: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_module/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_module/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" }
        ]
      },
      { test: /\.svg$/, use: "react-svg-loader" },
      { test: /\.png$/, use: "file-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`
          }
        }
      }
    }
  }
}
