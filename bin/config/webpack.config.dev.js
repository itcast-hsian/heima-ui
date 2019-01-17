const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { webpackConfig } = require("./webpack.config.base");
const paths = require('./paths');

const cwd = process.cwd();
const {name} = paths.appPackageJson;

module.exports = merge(webpackConfig,{
    mode: 'development',
    output:{
      pathinfo: true,
      path: paths.appBuild,  /* can add version "version&&isString(version)?`dist/${version}`:'dist'" */
      filename: `js/[name].js`,
      chunkFilename: '[name].chunk.js',
      publicPath: "/"
    },
    devtool: 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }, {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
)