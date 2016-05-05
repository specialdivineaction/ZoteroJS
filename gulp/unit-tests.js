var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

var karma = require('karma');

var pathSrcJs = [
  path.join(conf.paths.dist, conf.output.filename)
];

/**
 * Launch and delegate test running to Karma server
 *
 * @param  {boolean}  isSingle
 * @param  {function} done
 */
function runTests (isSingle, done) {
  var reporters = ['progress'];
  var preprocessors = {};

  if (isSingle) {
    pathSrcJs.forEach(function (path) {
      preprocessors[path] = ['coverage'];
    });

    reporters.push('coverage');
  }

  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: isSingle,
    autoWatch: !isSingle,
    reporters: reporters,
    preprocessors: preprocessors
  };

  var server = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error('failed ' + failCount + ' tests.') : null);
  });

  server.start();
}

gulp.task('test', ['scripts:test'], function (done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function (done) {
  runTests(false, done);
});
