var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var minifyCss = require( 'gulp-minify-css' );
var concat = require( 'gulp-concat' );
var babel = require( 'gulp-babel' );
var uglify = require( 'gulp-uglify' );
var rev = require( 'gulp-rev' );
var revReplace = require( 'gulp-rev-replace' );
var del = require( 'del' );

var paths = {
    srcScss: ['./src/scss/**/*.scss'],
    srcScssMain: './src/scss/application.scss',
    srcJs: ['./src/js/**/*.js'],
    srcHtml: ['./src/*.html'],
    srcImg: ['./src/img/**/*'],
    disCss: './dis/css/',
    disCssManifest: './dis/css/rev-manifest.json',
    disJs: './dis/js/',
    disJsManifest: './dis/js/rev-manifest.json',
    disHtml: './dis/',
    disImg: './dis/img/',
    disImgManifest: './dis/img/rev-manifest.json',
    dis: './dis/'
};

gulp.task( 'default', ['clean', 'scss', 'js', 'img', 'html', 'watch'] );

gulp.task( 'clean', function( done ) {
    return del([
        paths.dis
    ]);
});

gulp.task( 'scss', ['clean'], function( done ) {
    gulp.src( paths.srcScssMain )
        .pipe( sass() )
        .pipe( minifyCss() )
        .pipe( rev() )
        .pipe( gulp.dest( paths.disCss ) )
        .pipe( rev.manifest() )
        .pipe( gulp.dest( paths.disCss ) )
        .on( 'end', done );
});

gulp.task( 'js', ['clean'], function(done) {
    gulp.src( paths.srcJs )
        .pipe( babel( { presets: ['es2015'] } ) )
        .pipe( concat( 'application.js' ) )
        .pipe( uglify() )
        .pipe( rev() )
        .pipe( gulp.dest( paths.disJs ) )
        .pipe( rev.manifest() )
        .pipe( gulp.dest( paths.disJs ) )
        .on( 'end', done );
});

gulp.task( 'html', ['clean', 'scss', 'js', 'img'], function( done ) {
    gulp.src( paths.srcHtml )
        .pipe( revReplace({
            manifest: gulp.src( paths.disCssManifest )
        }))
        .pipe( revReplace({
            manifest: gulp.src( paths.disJsManifest )
        }))
        .pipe( revReplace({
            manifest: gulp.src( paths.disImgManifest )
        }))
        .pipe( gulp.dest( paths.disHtml ) )
        .on( 'end', done );
});

gulp.task( 'img', ['clean'], function( done ) {
    gulp.src( paths.srcImg )
        .pipe( rev() )
        .pipe( gulp.dest( paths.disImg ) )
        .pipe( rev.manifest() )
        .pipe( gulp.dest( paths.disImg ) )
        .on( 'end', done );
});

gulp.task( 'watch', function() {
    gulp.watch( paths.srcScss, ['scss', 'html'] );
    gulp.watch( paths.srcJs, ['js', 'html'] );
    gulp.watch( paths.srcImg, ['img', 'html'] );
    gulp.watch( paths.srcHtml, ['html'] );
});
