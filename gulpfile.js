"use strict";

var gulp              = require("gulp"),
    mergeStream       = require("merge-stream"),
    imagemin          = require("gulp-imagemin"),
    imageminJpegoptim = require('imagemin-jpegoptim'),
    imageminPngquant  = require('imagemin-pngquant');

/* Images paths */
var IMAGES_PATHS = [
        {
            "src" : "*/**/*.jpg",
            "dst" : ".",
        }
    ];

/* Gulp tasks */

//optimize images
gulp.task("optimizeImages", function() {
    var streams = mergeStream();

    IMAGES_PATHS.forEach(function(p) {
        //console.log(p.src, )
        streams.add(gulp.src(p.src)
		.pipe(imagemin([
            imagemin.gifsicle(),
            imageminPngquant(),
            imagemin.svgo(),
            imageminJpegoptim({
                max: 90,
                progressive: true
            })
        ]))
		.pipe(gulp.dest(p.dst)));
    });

    return streams;
});

gulp.task("default", ["optimizeImages"]);
