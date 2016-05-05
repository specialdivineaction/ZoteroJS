/* eslint-env node */

var path = require('path');
var conf = require('./gulp/conf');

var wiredep = require('wiredep');

function listFiles() {
  // pull in bower dependencies
  var wiredepOptions = {
    dependencies: true,
    devDependencies: true,
    directory: 'bower_components'
  };

  var vendors = wiredep(wiredepOptions).js || [];

  var patterns = vendors
    .concat([
      path.join(conf.paths.dist, conf.output.filename)
    ]);

  return patterns.map((pattern) => ({ pattern: pattern }));
}

module.exports = function (config) {
  var configuration = {
    files: listFiles(),
    singleRun: true,
    autoWatch: false,

    frameworks: [
      'phantomjs-shim',
      'mocha',
      'chai',
      'sinon'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-phantomjs-shim',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-sinon'
    ],

    browsers: [
      'PhantomJS'
    ],

    reporters: [
      'progress'
    ],

    proxies: {}
  };

  config.set(configuration);
}
