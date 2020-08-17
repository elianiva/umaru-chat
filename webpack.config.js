const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

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
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}
