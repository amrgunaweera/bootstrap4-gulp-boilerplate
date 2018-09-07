const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
//const browserSync = require('browser-sync');
//const livereload = require('gulp-livereload');

/*
 -- Top Level Functions --
 gulp.task - Define tasks
 gulp.src - Point to files to use
 gulp.dest - Points to folder to output
 gulp.watch - Watch files and folders for changes
 */

// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running..')
});

// Copy all html files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// Minify JS
/*gulp.task('minifyJs', function(){
    gulp.src('src/js/!*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});*/

// Optimize Images
gulp.task('imageMin', () =>
gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);

// Compile Sass
gulp.task('sass', function(){
   gulp.src('src/sass/*.scss')
       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
       .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Run All command
//gulp.task('default',['message','copyHtml', 'imageMin', 'sass', 'scripts']);
gulp.task('default', ['connect', 'watch']);

// Watch for file changes
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});

gulp.task('connect', function(){
    
    connect.server({
        root: 'dist',
        port: 8888,
        livereload: true
    });
    
});