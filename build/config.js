'use strict';

const pkg = require('../package');

module.exports = {
  port: 4001,
  title: 'summer-school-2017',
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
  cssModules: true,
  jsx: true
};
