var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    del = require('del');

var jsxFiles = [
  'src/loader/loader.gsap.jsx',
  'react-morph-buttons.jsx'
];

gulp.task('clean', function(done) { del(['build'], done) });

gulp.task('js', ['clean'], function() {
  var Compiler = babelify.configure({
    optional: [
      'es7.asyncFunctions',
      'es7.classProperties',
      'es7.comprehensions',
      'es7.decorators',
      'es7.exponentiationOperator',
      'es7.exportExtensions',
      'es7.functionBind',
      'es7.objectRestSpread',
      'es7.trailingFunctionCommas',

      'es6.spec.templateLiterals',
      'es6.spec.blockScoping',
      'validation.react',
      'es6.spec.symbols',

      'flow'
    ]
  })
  browserify(jsxFiles)
    .transform(Compiler)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/'))
  ;
});

gulp.task('watch', function() { gulp.watch(['src/**/*.jsx', '*.jsx'], ['js']) });
gulp.task('default', ['watch', 'js']);
