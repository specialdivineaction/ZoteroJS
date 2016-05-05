var gutil = require('gulp-util');

exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp'
};

exports.mainFile = 'index.js';

exports.output = {
  library: 'library',
  filename: 'library.js'
};


exports.dependencies = [
  // non-relative imports should be treated as external modules
  /^[^.][\w-.]+$/
];

exports.errorHandler = (title) => (err) => {
  gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
  this.emit('end');
};
