'use strict';

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: './',
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'));
  }
}
