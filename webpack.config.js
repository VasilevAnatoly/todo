var path = require("path");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // плагин минимизации
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var AngularNamedLazyChunksWebpackPlugin = require("angular-named-lazy-chunks-webpack-plugin");
var DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    vendor: "./src/vendor.ts",
    app: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    chunkFilename: "[name].[hash].chunk.js",
    filename: "[name].[hash].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    historyApiFallback: true,
    clientLogLevel: "silent",
    compress: true,
    open: "Chrome",
    port: 3001,
    watchContentBase: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve(__dirname, "tsconfig.json"),
            },
          },
          "angular-router-loader",
          "angular2-template-loader",
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: "file-loader?name=assets/images/[name].[hash].[ext]",
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: "file-loader?name=assets/fonts/[name].[hash].[ext]",
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "src/app"),
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/app"),
        loader: "raw-loader",
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")];
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: "imports-loader?jQuery=jquery",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js",
      tether: "tether",
      Tether: "tether",
      "window.Tether": "tether",
      Popper: ["popper.js", "default"],
      moment: "moment",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new CopyWebpackPlugin([
      { from: "src/assets/i18n", to: "assets/i18n" },
      { from: "src/assets/images", to: "assets/images" },
    ]),
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\|\/)core/,
      path.resolve(__dirname, "src"),
      {}
    ),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new AngularNamedLazyChunksWebpackPlugin(),
    new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false,
      },
    }),
  ],
};
