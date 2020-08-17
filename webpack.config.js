const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const dotenv = require("dotenv")
const webpack = require("webpack")

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  target: "web",
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.tsx"
    // pages: [
    //   "./src/pages/Login/index.tsx",
    //   "./src/pages/Register/index.tsx",
    //   "./src/pages/NotFound/index.tsx",
    //   "./src/pages/RoomList/index.tsx"
    // ],
    // components: [
    //   "./src/components/Firebase/index.ts",
    //   "./src/components/Form/index.tsx",
    //   "./src/components/Button/index.tsx"
    // ]
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
        use: "awesome-typescript-loader"
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
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}
