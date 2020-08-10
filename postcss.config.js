module.exports = {
  plugins: [
    process.env.NODE_ENV !== "development" && require("autoprefixer"),
    process.env.NODE_ENV !== "development" && require("cssnano")
  ]
}
