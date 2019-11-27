const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Common bulld configuration.
 * @type {import('webpack').Configuration}
 */
const commonConfig = {
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        angular: {
          chunks: "all",
          name: "angular",
          test: /angular/
        }
      }
    }
  }
};

/**
 * Development build configuration.
 * @type {import('webpack').Configuration}
 */
const devConfig = {
  ...commonConfig,
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    hot: true,
    open: true,
    overlay: true
  },
  watch: true
};

/**
 * Production build configuration.
 * @type {import('webpack').Configuration}
 */
const prodConfig = {
  ...commonConfig,
  mode: "production",
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: { sassOptions: { outputStyle: "compressed" } }
          }
        ]
      }
    ]
  },
  plugins: [
    ...commonConfig.plugins,
    new MiniCssExtractPlugin({
      chunkFilename: "main.css"
    })
  ]
};

module.exports = env => {
  switch (env) {
    case "production":
      return prodConfig;
    case "development":
      return devConfig;
  }
};
