var gutil = require('gulp-util');

exports.paths = {
  src: 'src',
  dist: 'dist',
  docs: 'docs',
  tmp: '.tmp'
};

exports.mainFile = 'index.js';

exports.output = {
  library: 'zotero',
  filename: 'zotero.js'
};

exports.dependencies = [
  // non-relative imports should be treated as external modules
  /^[^.][\w-.]+$/
];

exports.jsdoc = {
  opts: {
    destination: exports.paths.docs
  }
};

exports.errorHandler = (title) => (err) => {
  gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
  this.emit('end');
};
