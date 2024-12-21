const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.js",
    styles: "./css/style.css",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./index_PL.html",
      filename: "index_PL.html",
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./img",
          to: "img",
        },
        {
          from: "./js/swiper-bundle.min.js",
          to: "js/swiper-bundle.min.js",
        },
        {
          from: "./site.webmanifest",
          to: "site.webmanifest",
        },
        {
          from: "./robots.txt",
          to: "robots.txt",
        },
        {
          from: "./sitemap.xml",
          to: "sitemap.xml",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
    ],
  },
};
