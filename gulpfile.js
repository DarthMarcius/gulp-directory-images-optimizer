"use strict";

var gulp              = require("gulp"),
    mergeStream       = require("merge-stream"),
    imagemin          = require("gulp-imagemin"),
    imageminJpegoptim = require('imagemin-jpegoptim'),
    imageminPngquant  = require('imagemin-pngquant'),
    path = require("path");

/* Images paths */
var IMAGES_PATHS = [
        {
            "src" : path.resolve(process.env.INIT_CWD + "/**/*.jpg"),
            "dst" : ".",
        },
        {
            "src" : path.resolve(process.env.INIT_CWD + "/**/*.gif"),
            "dst" : ".",
        },
        {
            "src" : path.resolve(process.env.INIT_CWD + "/**/*.png"),
            "dst" : ".",
        },
        {
            "src" : path.resolve(process.env.INIT_CWD + "/**/*.svg"),
            "dst" : ".",
        }
    ];

/* Gulp tasks */

//optimize images
gulp.task("optimizeImages", function() {
    var streams = mergeStream();

    IMAGES_PATHS.forEach(function(p) {
        console.log("path",p.src )
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
